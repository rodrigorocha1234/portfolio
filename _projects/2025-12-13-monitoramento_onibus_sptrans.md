---
layout: project
title: "Monitoramento das posições dos ônibus em tempo real"
date: 2025-12-13
image: /assets/img/posts/monitoramento_onibus_sptrans_kafka/thumb.png
description:  "Neste projeto, desenvolvi um sistema de monitoramento em tempo real das posições de ônibus , usando a API da sptrans."
tags: ['python', 'nosql', 'rabbitmq']
---

## Introdução 

"Neste projeto, desenvolvi um sistema de monitoramento em tempo real das posições de ônibus , usando a API da sptrans, utilizando tecnologias modernas de streaming de dados, banco de dados leve e visualização interativa."



## Tecnologias Utilizadas

- 🐍 **Python** – Linguagem de programação principal  
- 🚀 **Apache Kafka** – Plataforma open source de streaming de eventos usada para ingestão, processamento e distribuição de dados em tempo real  
- 📊 **KSQL** – Banco de dados de streaming que permite consultar e processar dados do Apache Kafka utilizando SQL  
- 🗄️ **SQLite** – Banco de dados leve para armazenar informações de linhas e trajetos dos ônibus da cidade de São Paulo  
- 📈 **Streamlit** – Framework para construção do dashboard interativo  
- 🌐 **API da SPTrans** – Fonte de dados que retorna toda a operação de ônibus da cidade de São Paulo  

## Requisitos

### Requisitos Funcionais

- **RF1** – Coletar posições dos ônibus em tempo real  
- **RF2** – Calcular a velocidade média de cada ônibus  
- **RF3** – Calcular o total de ônibus em operação  
- **RF4** – Filtrar dados por linha via parâmetro externo  
- **RF5** – Visualizar os dados em um dashboard interativo  

### Requisitos Não Funcionais

- **RNF1** – As atualizações devem ser processadas em, no máximo, **3 minutos**  
- **RNF2** – O sistema deve rodar em **Docker Compose**, garantindo alta disponibilidade  
- **RNF3** – O Kafka deve suportar o aumento no volume de veículos, na frequência de coleta e no número de consumidores  
- **RNF4** – Os dados transmitidos devem manter **precisão**, **consistência** e **estrutura válida** do início ao fim do processamento  


## Arquitetura da solução
### Diagrama de classe-Produtor


 
![Exemplo de imagem](https://raw.githubusercontent.com/rodrigorocha1/monitoramento_sptrans_kafka/refs/heads/master/imagens/diagrama_classe_kafka.png)



O diagrama acima mostra a construção do script do produtor kafka. Um produtor usa uma instância da chamada da API da sptrans, onde no método buscar_linhas, retorna toda a operação de ônibus da cidade de São Paulo.

### Diagrama do dashboard MVC

 
![Exemplo de imagem](https://raw.githubusercontent.com/rodrigorocha1/monitoramento_sptrans_kafka/refs/heads/master/imagens/diagrama_classe_mvc.png)


O diagrama abaixo, mostra a comunicação do dashboard com o ksql, usando o padrão mvc (Model. View, controller), onde as classe DashboardView é responsável pela visualização dos dados e faz a comunicação com a classe DashboardController. A classe  DashboardController é responsável pela regras de negócio e faz a comunicação com duas classes, KsqlApi e Consulta. As classes  KsqlApi e Consulta são responsaveis pela manipulação da API do KSQL e a conexão no banco de dados SQLITE respectivamente.

### KSQL
O Kafka foi integrado com o KSQL para processamento em tempo real, permitindo consultas contínuas sobre os tópicos e cálculos de métricas agregadas, como:
    • Velocidade média por ônibus: O cálculo da velocidade foi feita usando a fórmula de haversine, onde ela usa a latitude e longitude inicial em um tempo, e a latitutde e longitude final em um determinado tempo.
    • Monitoramento da posição em tempo real


# Demonstração do projeto


{% include youtube.html 
   id="HjFWJFwZ6-Q" 
   title="Monitoramento das posições dos ônibus em tempo real"
%}





[Link do reposítório](hhttps://github.com/rodrigorocha1/monitoramento_sptrans_kafka)



## Scripts KSQL


Script para criar stream de dados com o json normalizado
```KSQL

CREATE STREAM ONIBUS_POSICAO_BRUTO (
    c STRING,
    cl INTEGER,
    sl INTEGER,
    lt0 STRING,
    lt1 STRING,
    qv INTEGER,
    p INTEGER,
    a BOOLEAN,
    ta STRING,
    py DOUBLE,
    px DOUBLE
) WITH (
    KAFKA_TOPIC = 'linhas_onibus',
    VALUE_FORMAT = 'JSON'
);



```

Script para obter a posição atual do ônibus

```KSQL

CREATE TABLE ONIBUS_POSICAO_ATUAL AS
SELECT
    p,
    LATEST_BY_OFFSET(c) AS c,
    LATEST_BY_OFFSET(py) AS py,
    LATEST_BY_OFFSET(p) AS id_onibus,
    LATEST_BY_OFFSET(px) AS px,
    LATEST_BY_OFFSET(ta) AS ta
FROM ONIBUS_POSICAO_BRUTO
GROUP BY p;


```


Criar reparticionamento

```KSQL

CREATE STREAM ONIBUS_POSICAO_REKEY
    WITH (PARTITIONS = 6) AS
SELECT *
FROM ONIBUS_POSICAO_BRUTO
PARTITION BY p;
```


Criar stream com a posição anterior e atual do ônibus

```KSQL

CREATE STREAM ONIBUS_POSICAO_ANTERIOR_ATUAL AS
SELECT
    s.p,
    t.c as c,
    t.py AS prev_py,
    t.px AS prev_px,
    t.ta AS prev_ta,
    s.py AS curr_py,
    s.px AS curr_px,
    s.ta AS curr_ta
FROM ONIBUS_POSICAO_REKEY s
LEFT JOIN ONIBUS_POSICAO_ATUAL t
    ON s.p = t.p;
```

Função UDF em java da fórmula de Haversine para consumir no KSQL

```Java
package com.company.ksql;

import io.confluent.ksql.function.udf.Udf;
import io.confluent.ksql.function.udf.UdfDescription;
import io.confluent.ksql.function.udf.UdfParameter;

import java.math.BigDecimal;
import java.time.Instant;

@UdfDescription(
        name = "velocidade_media",
        description = "Calcula velocidade média (km/h) usando Haversine + diferença de tempo em segundos.",
        category = "GEOSPATIAL"
)
public class VelocidadeMediaUdf {

    private static final double R = 6371.0;

    @Udf(description = "Velocidade média entre coordenadas (km/h)")
    public double velocidadeMedia(
            @UdfParameter("lat1") BigDecimal lat1,
            @UdfParameter("lon1") BigDecimal lon1,
            @UdfParameter("lat2") BigDecimal lat2,
            @UdfParameter("lon2") BigDecimal lon2,
            @UdfParameter("tsInicialISO") String tsInicialISO,
            @UdfParameter("tsFinalISO") String tsFinalISO
    ) {

        double lat1d = lat1.doubleValue();
        double lon1d = lon1.doubleValue();
        double lat2d = lat2.doubleValue();
        double lon2d = lon2.doubleValue();

        long tsInicial = Instant.parse(tsInicialISO).toEpochMilli();
        long tsFinal = Instant.parse(tsFinalISO).toEpochMilli();

        double dLat = Math.toRadians(lat2d - lat1d);
        double dLon = Math.toRadians(lon2d - lon1d);

        double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                + Math.cos(Math.toRadians(lat1d))
                * Math.cos(Math.toRadians(lat2d))
                * Math.sin(dLon/2) * Math.sin(dLon/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double distanciaKm = R * c;

        double dtSec = (tsFinal - tsInicial) / 1000.0;

        if (dtSec <= 0) return 0.0;

        return (distanciaKm / dtSec) * 3600.0;
    }
}


```

[Link do reposítório](https://github.com/rodrigorocha1234/monitoramento_sptrans_kafka)