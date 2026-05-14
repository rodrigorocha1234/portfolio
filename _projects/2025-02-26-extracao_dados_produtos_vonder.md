---
layout: project
title: Scraping no Site Vonder (B2B) a partir de Planilha Excel
date: 2025-02-26
image: /assets/img/posts/extracao_dados_produtos_vonder/thumb.png
description: Este projeto visa a construção de um web scraping usando Selenium para buscar produtos no site Vonder, salvar os dados em um arquivo XLSX e baixar as imagens dos produtos.
tags: ['python', 'webscraping', 'google', 'planilhas', 'selenium']
---






# Scraping no Site Vonder (B2B) a partir de Planilha Excel

## 1. Introdução

Este projeto visa a construção de um web scraping usando Selenium para buscar produtos no site Vonder, salvar os dados em um arquivo XLSX e baixar as imagens dos produtos. O arquivo XLSX será construído com as seguintes colunas:

- `DESCRICAO`
- `LINK_FORNECEDOR`
- `DESCRICAO_TITULO`
- `CONTEUDO_DA_EMBALAGEM`
- `CONTEUDO_DA_EMBALAGEM_HTML`
- `DETALHES_TECNICOS`
- `CERTIFICADOS`
- `CERTIFICADOS_HTML`
- `CATEGORIA_PRODUTO`

## 2. Diagrama de Classe

A figura abaixo mostra o diagrama de classe para o web scraping construído.

O diagrama consiste em consumir um serviço de web scraping, que permite salvar os dados em uma planilha e baixar as imagens dos produtos em formato PNG.

![Diagrama de Classe](https://static.wixstatic.com/media/123393_3d03b4107a7f42a9bfb5daecb7061388~mv2.png/v1/fill/w_740,h_533,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/123393_3d03b4107a7f42a9bfb5daecb7061388~mv2.png)

## 3. Demonstração


{% include youtube.html 
   id="DL7q3rfEc_8" 
   title="Scraping no Site Vonder (B2B) a partir de Planilha Excel" 
%}




[Link do reposítório](https://github.com/rodrigorocha1/extracao_dados_produtos_vonder)


