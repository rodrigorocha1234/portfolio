---
layout: project
title: "Projeto: Construção de um Feed de Site de Notícias usando Beautiful Soup e Streamlit"
date: 2025-02-27
image: /assets/img/posts/feed_sites_rss/thumb.png
description:  "A proposta deste projeto é demonstrar o conhecimento nas bibliotecas utilizadas para a extração de dados de sites e a criação de um feed dinâmico para exibição em uma aplicação Streamlit."
tags: ['python', 'beautifulsoup', 'streamlit', 'webscraping']
---



## 1 – Introdução
A proposta deste projeto é demonstrar o conhecimento nas bibliotecas utilizadas para a extração de dados de sites e a criação de um feed dinâmico para exibição em uma aplicação Streamlit. Serão coletados: URL da imagem da notícia, título da notícia, URL da notícia, descrição e data de atualização. O programa será dividido em duas partes:
- Extração de dados e armazenamento no banco de dados.
- Exibição dos dados usando Streamlit.

## 2 – Tecnologias Utilizadas
- **Python 3.10**
- **Beautiful Soup**
- **Streamlit**
- **SQLite** (banco de dados)

## 3 – Sites Extraídos (NoticiasRss)
Aqui estão os feeds de notícias utilizados no projeto:

- [Gazeta do Povo - Mundo](https://www.gazetadopovo.com.br/feed/rss/mundo.xml)
- [G1 - Tecnologia](https://g1.globo.com/rss/g1/tecnologia/)
- [G1 - Turismo e Viagem](https://g1.globo.com/rss/g1/turismo-e-viagem/)
- [G1 - Planeta Bizarro](https://g1.globo.com/rss/g1/planeta-bizarro/)
- [G1 - Pará](https://g1.globo.com/rss/g1/pa/para/)
- [G1 - Ribeirão Preto e Franca](https://g1.globo.com/rss/g1/sp/ribeirao-preto-franca/)
- [Notícias ao Minuto - Última Hora](https://www.noticiasaominuto.com.br/rss/ultima-hora)
- [Notícias ao Minuto - Tech](https://www.noticiasaominuto.com.br/rss/tech)

## 4 – Modelagem

### 4.1 – Construção do Banco de Dados
O banco de dados é composto por duas tabelas principais:
- **SITE**: Armazena os detalhes dos sites de notícias.
- **NOTÍCIA**: Armazena as notícias, associando cada notícia a um site.

Cada site possui várias notícias, e cada notícia pertence a um site específico.

![Diagrama do Banco de Dados](https://raw.githubusercontent.com/rodrigorocha1/feed_sites_rss/main/imagens/diagrama_mer.png)

### 4.2 – Construção do Pipeline
O pipeline é constituído de uma classe principal chamada `NoticiasRss`, onde cada atributo recebe um serviço de banco de dados e uma estratégia de web scraping. O projeto segue os princípios SOLID, mais especificamente o **D** – Princípio da Inversão da Dependência.

#### Diagrama de Classe do Pipeline
![Diagrama do Pipeline](https://raw.githubusercontent.com/rodrigorocha1/feed_sites_rss/main/docs/diagrama%20de%20classe.png)

### 4.3 – Dashboard, Padrão MVC
O padrão MVC (**Model**, **View**, **Controller**) é utilizado para isolar as regras de negócio da lógica de apresentação. Esse modelo garante que as responsabilidades sejam bem separadas, facilitando a manutenção e evolução do código.

#### Diagrama de Classe MVC
![Diagrama MVC](https://raw.githubusercontent.com/rodrigorocha1/feed_sites_rss/main/docs/diagrama%20de%20classe_mvc.png)

## 5 – Demonstração
Você pode ver o projeto em ação no seguinte link:



{% include youtube.html 
   id="ZbaxZAqrqiQ" 
   title="Projeto: Construção de um Feed de Site de Notícias usando Beautiful Soup e Streamlit"
%}






---

### Estrutura SQL do SQLITE

```sql
CREATE TABLE NOTICIA(
    ID_NOTICIA INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_SITE INT,
    TITULO_NOTICIA TEXT,
    URL_NOTICIA TEXT,
    URL_IMG TEXT,
    DESCRICAO TEXT,
    DATA_PUBLICACAO TEXT,
    CATEGORIA TEXT,
    FOREIGN KEY (ID_SITE) REFERENCES SITE(ID_SITE)
);

CREATE INDEX idx_noticia ON NOTICIA(ID_NOTICIA);

CREATE TABLE SITE(
    ID_SITE INT PRIMARY KEY,
    NOME_SITE TEXT UNIQUE
);

CREATE INDEX idx_site ON SITE(ID_SITE);
```