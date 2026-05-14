---
layout: project
title: Data Lake na AWS
image: https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg
description: Arquitetura de data lake escalável na AWS.
tags: [AWS, Spark, Data Lake, ETL, teste de Site, chave_2, chave3, chave4, chave5, chave6]
---

# Data Lake na AWS

Construção de uma arquitetura moderna de Data Lake na AWS voltada para processamento em larga escala e analytics.

---

## Visão Geral

Projeto focado em ingestão, processamento e exposição de dados em ambiente cloud utilizando serviços serverless e distribuídos.

A arquitetura foi projetada para suportar mais de **50 milhões de eventos por dia**, garantindo escalabilidade horizontal e baixo custo operacional.

---

## Arquitetura

A solução segue o padrão **Medallion Architecture**:

- **Bronze:** dados brutos no S3  
- **Silver:** dados limpos e normalizados  
- **Gold:** camada analítica para BI  

---

## Stack Tecnológica

- Amazon S3  
- AWS Glue  
- Athena  
- Apache Spark  
- Airflow  
- Python  

---

## Pipeline

1. Ingestão de dados via APIs e batch
2. Armazenamento no S3 (Bronze)
3. Processamento com Spark
4. Catalogação via Glue
5. Consumo via Athena

---

## Resultados

- Redução de 70% no custo de queries
- Processamento de +50M registros/dia
- Queries 10x mais rápidas
- Arquitetura escalável e desacoplada

---

## Aprendizados

- Design de pipelines distribuídos
- Otimização de particionamento S3
- Formatos colunares (Parquet)
- Governança de dados em cloud

---

## Conclusão

O projeto demonstra como uma arquitetura bem estruturada em cloud pode transformar dados brutos em ativos analíticos de alto valor.