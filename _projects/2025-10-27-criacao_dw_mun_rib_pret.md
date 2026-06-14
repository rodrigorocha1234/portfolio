---
layout: project
title: "Criação de um datawarehouse para os municípios da região de Ribeirão Preto"
date: 2025-10-27
image: /assets/img/posts/datawarehouse_clima_rp/thumb.png
description: "Amrmazenamento de dados climáticos para a regão de Ribeirão Preto"
tags: ['python', 'apache_airflow', 'sql_server', 'etl', 'datawarehouse', 'engenharia de dados']
---



# Criação de um datawarehouse para os municípios da região de Ribeirão Preto


## 1. 🛠️ Tecnologias utilizadas

* **Python**: Linguagem para a construção do ETL (Extração, Transformação e Carga).
* **Apache Airflow**: Orquestração do fluxo de dados.
* **Celery**: Processamento distribuído e execução assíncrona de tarefas.
* **Flower**: Monitoramento das tarefas do Celery em tempo real.
* **SQL SERVER**: Banco de dados para a construção do datawarehouse.
* **Docker Compose**: Empacotamento e execução dos serviços em ambiente isolado e padronizado.
* **DBT (Data Build Tool)** (transformações de dados e modelagem no data warehouse)

## 2. 🏗️ Arquitetura da solução

### 2.1 – 📌 Requisitos funcionais

1.  **RF1** – O sistema deve coletar dados da `OpenWeatherAPI` para os municípios da região de Ribeirão Preto.
2.  **RF2** – O sistema deve processar os dados brutos em estruturas analíticas (dimensões e fatos).
3.  **RF3** – O sistema deve obter os campos (`temperatura`, `umidade`, `pressão`, `vento`, `chuva`, etc.).
4.  **RF4** – O sistema deve manter uma tabela fato (`fato_clima`).
5.  **RF5** – O Sistema deve manter tabelas de dimensão (`DIM_CALENDARIO`, `DIM_CIDADE`).

### 2.2 – ⚙️ Requisitos não funcionais

1.  **RNF1** – O sistema deve processar cada carga de dados em menos de 10 minutos para os municípios.
2.  **RNF2** – As consultas analíticas devem responder em segundos.
3.  **RNF3** – O Sistema deve coletar os dados climáticos em intervalo de 10 minutos, 3 vezes ao dia.

### 3.3 – 📐 Diagrama de Classes

<div style="text-align: center;">
  <img 
    src="https://github.com/rodrigorocha1/datawarehouse_dados_climaticos/blob/master/imagens/dw_clima_class.png?raw=true"
    alt="Diagrama de Classe do Data Warehouse Climático"
    style="width: 1200px; max-width: 100%; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2); margin-bottom: 30px;"
  />
</div>  

<div >

</div>  


A figura acima mostra o **diagrama de classes** do projeto. O diagrama evidencia a **flexibilidade da arquitetura**, permitindo a **substituição da API** e do **banco de dados** sem comprometer o funcionamento do **pipeline ETL**.  

O **ETL** pode receber **exatamente um serviço de API** e **um serviço de banco de dados**, garantindo **baixo acoplamento** e **alta coesão** entre os componentes do sistema.  




### 3.4 – 🧩 Diagrama entidade-relacionamento 

<div style="text-align: center;">
  <img 
    src="https://github.com/rodrigorocha1/datawarehouse_dados_climaticos/blob/master/imagens/diagrama_entidade_relacionamento.png?raw=true"
    alt="Diagrama de entidade - relacionameto do Data Warehouse Climático"
    style="width: 1200px; max-width: 100%; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2); margin-bottom: 30px;"
  />
</div>  

<div >

</div>  


A figura acima mostra o **diagrama de entidade-relacionamento** do banco de dados, destacando as **cardinalidades**:

- **Uma cidade possui várias medições de clima (1:N)**
- **Um instante de tempo possui várias medições de clima (1:N)**


# 4 – Métricas do Datawarehouse
O data warehouse permite o cálculo de diversas métricas essenciais. Seguem algumas métricas que podem ser obtidas:

- Temperatura média diária, semanal, mensal.
- Amplitude térmica (máx – mín) diária.
- Precipitação acumulada diária, semanal, mensal.
- Velocidade média do vento por hora, dia, mês.

---

# 5 – Estimativa de Crescimento

Como discutido anteriormente, o datawarehouse será alimentado 3 vezes ao dia. As estimativas de armazenamento são apresentadas abaixo.

## 5.1 – Tabela DIM_CIDADE

| CAMPOS      | Tamanhos |
|------------|----------|
| ID_CIDADE  | 4 Bytes  |
| NOME_CIDADE| 255 * 2 = 510 Bytes |

> A tabela acima armazena os dados cadastrais das cidades.  
> Calculamos o tamanho de cada linha com base no comprimento real do nome da cidade, já que o `NVARCHAR` ocupa espaço variável (2 bytes por caractere utilizado):
> - **ID_CIDADE (INT):** 4 bytes (fixo)  
> - **NOME_CIDADE (NVARCHAR):** 2 bytes * número de caracteres  

Somando o tamanho individual de cada uma das 18 linhas, o armazenamento real utilizado é **466 bytes**.

### Detalhamento do cálculo por cidade

| NOME_CIDADE                     | Caracteres | Cálculo Nome (bytes) | Cálculo Linha (ID + Nome) | Total Linha |
|---------------------------------|------------|--------------------|---------------------------|------------|
| Sertãozinho                     | 11         | 22                 | 4 + 22                   | 26         |
| São Simão                        | 9          | 18                 | 4 + 18                   | 22         |
| Santa Rita do Passa Quatro       | 26         | 52                 | 4 + 52                   | 56         |
| Sales Oliveira                   | 14         | 28                 | 4 + 28                   | 32         |
| Ribeirão Preto                   | 14         | 28                 | 4 + 28                   | 32         |
| Pradópolis                       | 10         | 20                 | 4 + 20                   | 24         |
| Pitangueiras                     | 12         | 24                 | 4 + 24                   | 28         |
| Morro Agudo                       | 11         | 22                 | 4 + 22                   | 26         |
| Monte Alto                        | 10         | 20                 | 4 + 20                   | 24         |
| Jardinópolis                     | 12         | 24                 | 4 + 24                   | 28         |
| Jaboticabal                      | 11         | 22                 | 4 + 22                   | 26         |
| Guatapará                        | 9          | 18                 | 4 + 18                   | 22         |
| Cravinhos                        | 9          | 18                 | 4 + 18                   | 22         |
| Cajuru                           | 6          | 12                 | 4 + 12                   | 16         |
| Batatais                         | 8          | 16                 | 4 + 16                   | 20         |
| Barrinha                         | 8          | 16                 | 4 + 16                   | 20         |
| Altinópolis                       | 11         | 22                 | 4 + 22                   | 26         |
| Dumont                           | 6          | 12                 | 4 + 12                   | 16         |
| **SOMA TOTAL**                   | -          | -                  | -                         | 466        |

---

## 5.2 – Tabela FT_CLIMA

| Nome da Coluna      | Tipo de Dado   | Restrições | Comentário (Tamanho) |
|--------------------|---------------|-----------|--------------------|
| ID_CIDADE           | INT           | NOT NULL  | 4 bytes            |
| DATA_CONSULTA       | DATE          | NOT NULL  | 3 bytes            |
| HORA_CONSULTA       | TIME          | NOT NULL  | 3 bytes            |
| TEMPERATURA         | DECIMAL(5,2)  |           | 5 bytes            |
| PRESSAO             | DECIMAL(7,2)  |           | 9 bytes            |
| UMIDADE             | SMALLINT      |           | 2 bytes            |
| VELOCIDADE_VENTO    | DECIMAL(5,2)  |           | 5 bytes            |
| ANGULO_VENTO        | DECIMAL(5,2)  |           | 5 bytes            |

> Tamanho total estimado por linha: **36 bytes**  

### Crescimento estimado

1. **Total de Linhas Adicionadas por Dia**:  
18 cidades × 3 alimentações/dia = 54 linhas/dia

2. **Crescimento Diário (Bytes)**:  
54 linhas × 36 bytes/linha = 1.944 bytes ≈ 1,9 KB/dia

3. **Crescimento Mensal (30 dias)**:  
1.944 bytes × 30 dias = 58.320 bytes ≈ 57 KB/mês

4. **Crescimento Anual (365 dias)**:  
1.944 bytes × 365 dias = 709.560 bytes ≈ 0,68 MB

> Conclusão: o crescimento de volume é baixo para padrões modernos.

---

## 5.3 – Tabela DIM_CALENDARIO

| Tabela         | Cenário de Crescimento | Tam. por Linha (Bytes) | Novas Linhas / Dia | Crescimento Diário | Crescimento Anual (365 dias) |
|----------------|----------------------|----------------------|------------------|------------------|-----------------------------|
| DIM_CALENDARIO | Cenário A (3x/dia)   | ≈ 65                 | 3                | 195 Bytes        | 71,2 KB                     |

| Nome da Coluna       | Tipo de Dado | Tamanho Padrão | Comentário sobre o cálculo |
|---------------------|-------------|----------------|---------------------------|
| DATA_CALENDARIO      | DATE        | 3 bytes        | Tamanho fixo para data sem hora |
| HORA                 | TIME        | 3 bytes        | Tamanho fixo sem segundos fracionários |
| ANO                  | INT         | 4 bytes        | Número inteiro padrão |
| MES                  | INT         | 4 bytes        | INT definido |
| DIA                  | INT         | 4 bytes        | INT definido |
| TRIMESTRE            | INT         | 4 bytes        | INT definido |
| SEMANA_DO_ANO        | INT         | 4 bytes        | INT definido |
| DIA_DA_SEMANA        | INT         | 4 bytes        | INT definido |
| NOME_MES             | VARCHAR(20) | ≈ 9 bytes      | Média de 8 bytes + overhead |
| NOME_DIA_SEMANA      | VARCHAR(20) | ≈ 12 bytes     | Média de 11 bytes + overhead |
| ANO_MES              | VARCHAR(7)  | 8 bytes        | Formato 'YYYY-MM' + 1 byte overhead |
| TURNO                | VARCHAR(20) | ≈ 6 bytes      | Média 5 bytes + overhead |

**Detalhamento do crescimento:**

- Crescimento diário: 3 linhas × 65 bytes = 195 bytes/dia  
- Crescimento mensal (30 dias): 195 × 30 = 5.850 bytes ≈ 5,7 KB  
- Crescimento anual (365 dias): 195 × 365 = 71.175 bytes ≈ 71 KB  

---

# 5 – Estrutura do banco (Script SQL)

```sql
CREATE TABLE DIM_CIDADE (
    ID_CIDADE INT NOT NULL PRIMARY KEY,
    NOME_CIDADE NVARCHAR(255)
);

CREATE TABLE DIM_CALENDARIO (
    DATA_CALENDARIO DATE NOT NULL,
    HORA TIME NOT NULL,
    ANO INT,
    MES INT,
    DIA INT,
    TRIMESTRE INT,
    SEMANA_DO_ANO INT,
    DIA_DA_SEMANA INT,
    NOME_MES VARCHAR(20),
    NOME_DIA_SEMANA VARCHAR(20),
    ANO_MES VARCHAR(7),
    TURNO VARCHAR(20),
    PRIMARY KEY (DATA_CALENDARIO, HORA)
);

CREATE TABLE FT_CLIMA (
    ID_CIDADE INT NOT NULL,
    DATA_CONSULTA DATE NOT NULL,
    HORA_CONSULTA TIME NOT NULL,
    TEMPERATURA DECIMAL(5,2),
    PRESSAO DECIMAL(7,2),
    UMIDADE SMALLINT,
    VELOCIDADE_VENTO DECIMAL(5,2),
    ANGULO_VENTO DECIMAL(5,2),
    NOME_CIDADE NVARCHAR(255),

    CONSTRAINT FK_FT_CLIMA_CIDADE FOREIGN KEY (ID_CIDADE)
        REFERENCES DIM_CIDADE(ID_CIDADE),

    CONSTRAINT FK_FT_CLIMA_CALENDARIO FOREIGN KEY (DATA_CONSULTA, HORA_CONSULTA)
        REFERENCES DIM_CALENDARIO(DATA_CALENDARIO, HORA)
);
```
# 5.1 – Dicionário de Dados

## DIM_CIDADE
**Descrição:** Tabela de dimensão que armazena informações sobre as cidades.

| Nome da Coluna | Tipo de Dado   | Restrições             | Descrição                     |
|----------------|---------------|-----------------------|-------------------------------|
| ID_CIDADE      | INT           | NOT NULL, PRIMARY KEY | Identificador único da cidade |
| NOME_CIDADE    | NVARCHAR(255) |                       | Nome da cidade                |

---

## DIM_CALENDARIO
**Descrição:** Tabela de dimensão que armazena atributos de data e hora para análise temporal.

| Nome da Coluna       | Tipo de Dado | Restrições               | Descrição                        |
|---------------------|-------------|-------------------------|----------------------------------|
| DATA_CALENDARIO      | DATE        | NOT NULL, PRIMARY KEY (composta) | Data no formato YYYY-MM-DD       |
| HORA                 | TIME        | NOT NULL, PRIMARY KEY (composta) | Hora no formato HH:MM:SS         |
| ANO                  | INT         |                         | Ano extraído da data             |
| MES                  | INT         |                         | Mês extraído da data             |
| DIA                  | INT         |                         | Dia extraído da data             |
| TRIMESTRE            | INT         |                         | Trimestre do ano                 |
| SEMANA_DO_ANO        | INT         |                         | Número da semana no ano          |
| DIA_DA_SEMANA        | INT         |                         | Dia da semana (1=Domingo, 7=Sábado) |
| NOME_MES             | VARCHAR(20) |                         | Nome do mês por extenso          |
| NOME_DIA_SEMANA      | VARCHAR(20) |                         | Nome do dia da semana            |
| ANO_MES              | VARCHAR(7)  |                         | Ano e mês no formato YYYY-MM     |
| TURNO                | VARCHAR(20) |                         | Período do dia (Manhã, Tarde, Noite) |

---

## FT_CLIMA
**Descrição:** Tabela de fatos que armazena as medições climáticas coletadas.

| Nome da Coluna    | Tipo de Dado  | Restrições                       | Descrição                              |
|------------------|---------------|---------------------------------|----------------------------------------|
| ID_CIDADE         | INT           | NOT NULL, FOREIGN KEY -> DIM_CIDADE(ID_CIDADE) | Chave estrangeira                     |
| DATA_CONSULTA     | DATE          | NOT NULL, FOREIGN KEY -> DIM_CALENDARIO(DATA_CALENDARIO) | Data da consulta                       |
| HORA_CONSULTA     | TIME          | NOT NULL, FOREIGN KEY -> DIM_CALENDARIO(HORA) | Hora da consulta                       |
| TEMPERATURA       | DECIMAL(5,2)  |                                 | Temperatura registrada (°C)            |
| PRESSAO           | DECIMAL(7,2)  |                                 | Pressão atmosférica (hPa)             |
| UMIDADE           | SMALLINT      |                                 | Umidade relativa do ar (%)             |
| VELOCIDADE_VENTO  | DECIMAL(5,2)  |                                 | Velocidade do vento (m/s ou km/h)     |
| ANGULO_VENTO      | DECIMAL(5,2)  |                                 | Direção do vento (graus)               |
| NOME_CIDADE       | NVARCHAR(255) |                                 | Nome da cidade                          |


## 6 - Demonstração do projeto


{% include youtube.html 
   id="Bya17xBQpZ8" 
   title="Criação de um datawarehouse para os municípios da região de Ribeirão Preto" 
%}




[Link do reposítório](https://github.com/rodrigorocha1/datawarehouse_dados_climaticos)
