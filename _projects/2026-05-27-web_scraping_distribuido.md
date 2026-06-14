---
layout: project
title: "Propostra de construção de web scraping  distribuido dos sites do g1."
date: 2026-05-27
image: /assets/img/posts/web_scraping_rss_distribuido/thumb.png
description: "Construir um web scraping distribuido e monitorar"
tags: ['python', 'docker', 'beautifulsoup', 'grafana', 'prometheus', 'celery', 'processamento distribuido']
---
## Objetivo 

Este projeto tem como objetivo apresentar uma arquitetura distribuída de web scraping baseada em Python e Celery, capaz de executar coleta paralela de conteúdo dos sites rss e dos portais do G1 **(Ribeirão Preto e Pará)**, com gerenciamento assíncrono de tarefas, escalabilidade horizontal, tolerância a falhas e monitoramento operacional.


## Tecnologias Utilizadas

- 🐍 Python 3.11
- ⚙️ Celery 5.6.3
- 🐳 Docker Compose
- 🔴 Redis
- 📈 Prometheus
- 📊 Grafana
 
---

# Arquitetura da Solução

## Diagrama de atividade

![qe_te](https://raw.githubusercontent.com/rodrigorocha1234/processamento_distribuido_rss/refs/heads/main/img/diagrama_atividade.png)


Com base no diagrama de atividade acima, ele apresenta o pipeline de extração de noticia em 5 etapas:

**Orquestração e agendamento “Scheduler”:** Aqui foi definia o ínicio da extração de dados com as urls rss de forma paralela, ou seja, se usarmos duas urls rss, irá ser criada 2 tarefas no total, uma para cada url.

**Leitura dos Feeds Rss:**  Para cada url rss criada para tarefa anteriormente, irá ser obtido uma média de total 100 urls de noticias do site do g1, e de cada url do g1, é criada uma tarefa para cada url, além de registrar as métricas no prometheus.

**Ingestão, Deduplicação e extração de conteúdo:** Aqui e feito o acesso de cada url do g1 e salvar o texto da noticia em arquivo, com controle de duplicidade, ou seja, é verificada se a url do g1 já gerou um arquivo.


## Diagrama de classe
![qe_te](https://raw.githubusercontent.com/rodrigorocha1234/processamento_distribuido_rss/refs/heads/main/img/diagrama_classes.png)

### Organização dos Serviços

O diagrama acima mostra a organização de cada tipo de serviço. Foi organizado em serviçoes de banco de dados e serviço de gravação de arquivo. Cada serviço pode ser substituido de forma flexivel de forma a não interferir de funcionamento do serviço de extração de dados.


### 1 – Pacote Modelo

É a base de dados que fluem pelo sistemas.

- **Noticias:** Age como a entidade principal do sistema. Ela contém id, título, subtítulo, autor, data e texto.
- **Dados rss:** Um dicionário tipados para manipulação dos formatos específicos dos feeds RSS.



### 2 - Pacote servicos.extracao_sites (Camada de Extração)

- **IWebScraping (Protocol):** Define o contrato de extração do web scraping, ou seja, os métodos que o web scraping irá fazer.

- **WebScrapingBs4 (ABC):** Uma classe abstrata base que embute o motor do BeautifulSoup4.

- **Implementações Concretas (WebScrapingRss e WebScrapingG1):** As classes herdam de WebScrapingBs4, permitindo criar uma lógica diferente para classe de implementação concreta. Ela possui uma dependência com a classe de tratamento.


### 3 - Pacote servicos.banco

Interfaces (**Operacao** e **IdbConfig**): Aqui é aplicado Protocol para garantir a inversão de dependência. O sistema não depende de um banco de dados específico, mas do contrato.

- **Implementação Redis (OperacaoRedis e DbConfigRedis):** O Redis está sendo usado aqui, e métodos como monitorar_fila sugerem que este pipeline pode estar trabalhando de forma assíncrona ou distribuída.



### 4 - Pacote servicos.guardar_dados (Camada de Exportação)

- **Arquivo (ABC) e ArquivoDOCX:** Um módulo para exportar as entidades Noticia para documentos físicos (Word), respeitando o princípio de Aberto/Fechado (Open/Closed Principle).



### 5 - Pacote servicos.tratamento (Camada de Transformação)

- **Tratamento:** Uma classe utilitária, aparentemente com um método estático ou de classe limpar_descricao(textos: ResultSet). Ela isola a lógica de limpeza de strings (como remoção de tags HTML residuais ou caracteres de escape) da lógica de extração.

---

## Diagrama de arquitetura


![qe_te](https://raw.githubusercontent.com/rodrigorocha1234/processamento_distribuido_rss/refs/heads/main/img/diagrama_arq_int.png)


O diagrama de arquitetura e integração mostra a organização da extração de web scraping distribuido que foi construido usando o docker compose.

**Aplicações e portais Web:** Aqui são nossos servicos web como rss_app, que é o motor principal de extração, além de flower,  redis-commander e redisinsight, responsáveis pela visualização e monitoramento das consultas.

**Banco redis:** É o banco responsavel por guardar os dados da extração.

**Processamento Assíncrono:** Aqui, é criado os worker (trabalhos de extração), evitando que cada worker simples, seja sobrecarregado por workers complexos.

**Volume:** Aqui eu persisto os volumes, são os dados de desempenho do pipeline que serão usados para a construção do dashboard no grafana.


## Uso do celery

![qe_te](https://raw.githubusercontent.com/rodrigorocha1234/processamento_distribuido_rss/refs/heads/main/img/processo_celery.png)


## Workers e Responsabilidades

| Worker                    | Função |
|---------------------------|---------|
| `fila_monitoramento` | Monitora o tamanho das filas do sistema. |
| `fila_alimentar_url_rss` | Responsável por distribuir o processamento de múltiplas URLs RSS. |
| `fila_processar_url_rss` | Realiza a extração dos elementos do RSS e envia os dados para a fila de buffer. |
| `ingest_noticia` | Fila de encaminhamento responsável por enviar dados para o processamento da notícia. |
| `processar_noticia` | Obtém a notícia do G1, gera o arquivo estruturado e salva o resultado no Redis. |


## Uso do prometheus e grafana,

Abaixo, foram proposta as métricas que foram calculadas no prometheus e exibida no grafana

### Total de Workers Ativos
- **Descrição:** Mostra o total de workes ativos  
- **Fórmula:** `count(celery_active_workers)`



### Latência 95%
- **Descrição:** Mostra o tempo de latência em 95% da task. Ex: 95% das execuções terminam em até 3.6s.  
- **Fórmula:** `histogram_quantile( 0.95, sum(rate(celery_task_duration_seconds_bucket{task_name="app.tasks.rss.processar_noticia"}[5m])) by (le) )`



### Tasks em execução
- **Descrição:** Mostra o total de tasks que estão ativas para execução.  
- **Fórmula:** `sum(celery_tasks_active_total)`



### Total de Tasks Processadas
- **Descrição:** Mostra o total de tasks processadas  
- **Fórmula:** `sum(celery_tasks_total)`



### Taxa Média de Crescimento por Segundo no Intervalo
- **Descrição:** Mostra o tempo total de CPU/execução das tasks está sendo consumido por segundo  
Ex: A cada 1 segundo, as tasks estão consumindo 0.8 segundos de execução  
- **Fórmula:** `rate(celery_task_duration_seconds_sum[$__rate_interval])`



### Duração média real da task
- **Descrição:** Mostra o média  de tasks consumida por segundo. Ex: 5 / 10 = 0.5 segundos por task : Em média, cada task está consumindo 0,5 segundos de tempo de execução  
- **Fórmula:** `rate(celery_task_duration_seconds_sum[$__rate_interval]) / rate(celery_task_duration_seconds_count[$__rate_interval])`


## Demostração do projeto

{% include youtube.html 
   id="HcWDgNzBjto" 
   title="Propostra de construção de web scraping  distribuido dos sites do g1."
%}



[Link do reposítório](https://github.com/rodrigorocha1234/processamento_distribuido_rss)
