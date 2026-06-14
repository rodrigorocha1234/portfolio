---
layout: project
title: Sistema de Monitoramento Climático de Ribeirão Preto
date: 2025-02-26
image: /assets/img/posts/monitoramento_climatico_ribeirao_preto/monitoramento_kafka_grafana.jpg
description: Este projeto tem como objetivo propor um sistema de monitoramento climático para a região de Ribeirão Preto
tags: ['grafana', 'apache_kafka', 'python', 'engenharia de dados']
---


# Sistema de Monitoramento Climático de Ribeirão Preto

Este projeto tem como objetivo propor um sistema de monitoramento climático para a região de Ribeirão Preto, utilizando Apache Kafka para coleta de dados e Grafana para visualização e análise em tempo real.

## Tecnologias Utilizadas

- **Apache Kafka** para coleta e distribuição de dados
- **Python** para a programação do produtor e consumidor
- **OpenWeatherAPI** para obtenção dos dados de temperatura
- **Grafana** para monitoramento e visualização dos dados coletados
- **Docker** para contêinerização dos serviços
- **Banco de dados InfluxDB** para armazenamento de dados

## Arquitetura do Sistema

### 1. Produtor Python

Um script Python coleta os dados da API OpenWeather dos seguintes municípios:

- Barrinha, Brodowski, Cravinhos, Dumont, Guatapará, Jardinópolis, Pontal, Pradópolis, Ribeirão Preto, Santa Rita do Passa Quatro, São Simão, Serrana, Serra Azul, Sertãozinho.

Esses dados são publicados em um tópico Kafka.

### 2. Consumidor Python

O consumidor (script Python) escuta o tópico Kafka e grava os dados coletados no banco de dados InfluxDB.

### 3. Grafana

O Grafana acessa o banco de dados e exibe os dados em tempo real no dashboard.

![Fluxo de dados](https://raw.githubusercontent.com/rodrigorocha1/monitoramento_condicoes_climaticas_kafka_grafana/refs/heads/main/fig/diagrama_fundo_preto.png)

## Gráficos e Métricas

### 1. Tabela com o Ângulo dos Ventos

Exibe a direção do vento junto com a sua velocidade.

### 2. Tabela com a Velocidade dos Ventos

Exibe a velocidade do vento junto com sua respectiva classificação na escala de Beaufort.

#### Escala de Beaufort para Velocidade dos Ventos

<table>
  <thead>
    <tr>
      <th>Força  </th>
      <th>Velocidade do Vento (km/h)</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>0 – 1</td>
      <td>Calmaria</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2 – 5</td>
      <td>Brisa muito leve</td>
    </tr>
    <tr>
      <td>2</td>
      <td>6 – 11</td>
      <td>Brisa leve</td>
    </tr>
    <tr>
      <td>3</td>
      <td>12 – 19</td>
      <td>Brisa fraca</td>
    </tr>
    <tr>
      <td>4</td>
      <td>20 – 28</td>
      <td>Brisa moderada</td>
    </tr>
    <tr>
      <td>5</td>
      <td>29 – 38</td>
      <td>Brisa forte</td>
    </tr>
    <tr>
      <td>6</td>
      <td>39 – 49</td>
      <td>Vento fresco</td>
    </tr>
    <tr>
      <td>7</td>
      <td>50 – 61</td>
      <td>Vento forte</td>
    </tr>
    <tr>
      <td>8</td>
      <td>62 – 74</td>
      <td>Ventania</td>
    </tr>
    <tr>
      <td>9</td>
      <td>75 – 88</td>
      <td>Ventania forte</td>
    </tr>
    <tr>
      <td>10</td>
      <td>89 – 102</td>
      <td>Temporal</td>
    </tr>
    <tr>
      <td>11</td>
      <td>103 – 117</td>
      <td>Tempestade violenta</td>
    </tr>
    <tr>
      <td>12</td>
      <td>118 ou mais</td>
      <td>Furacão</td>
    </tr>
  </tbody>
</table>



### 3. Temperatura, Umidade, Velocidade, Pressão Atmosférica e Visibilidade

Esses dados são exibidos com um card mostrando o valor no momento, junto com um gráfico de linha que representa o valor ao longo do tempo.

## Diagrama de Classe para o Produtor e Consumidor

A arquitetura do sistema é mostrada abaixo, desde o monitoramento até a gravação dos dados no banco de dados InfluxDB.

![Diagrama de Classe](https://raw.githubusercontent.com/rodrigorocha1/monitoramento_condicoes_climaticas_kafka_grafana/refs/heads/main/out/diagramas/diagrama_classe/diagrama_classe.png)

## Demonstração do Dashboard

Abaixo está uma captura de tela da interface do Grafana mostrando o dashboard com os dados em tempo real.


<!-- [![Assistir ao vídeo de demonstração do dashboard](https://img.shields.io/badge/🎬%20Assistir%20ao%20vídeo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/G23vsXYHjIo) -->



{% include youtube.html 
   id="G23vsXYHjIo" 
   title="Sistema de Monitoramento Climático de Ribeirão Preto" 
%}




[Link do reposítório](https://github.com/rodrigorocha1/monitoramento_condicoes_climaticas_kafka_grafana)
