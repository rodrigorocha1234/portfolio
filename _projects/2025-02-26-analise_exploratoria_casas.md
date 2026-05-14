---
layout: project
title: Análise exploratória dos imóveis da Cidade de Ribeirão Preto
date: 2025-02-26
image: /assets/img/posts/analise_exploratoria_casas/thumb.png
description: Os dados foram extraídos do site vivareal (https://www.vivareal.com.br/), atráves de um processo de web scraping (Mostrar o projeto anterior), gerando uma base de 8395 linhas e 9 colunas. Foram incluidas, em alguns casos, análise para os bairros Jardim Botânico, Centro, Nova Aliança, Jardim Irajá, Sumarezinho, Vila Monte Alegre, Bonfim Paulista, Ribeirânia e Campos Eliseos.
tags: ['python', 'webscraping', 'google', 'planilhas', 'selenium']
---




# 1- Introdução

Os dados foram extraídos do site [Viva Real](https://www.vivareal.com.br/), através de um processo de **web scraping** ([Mostrar o projeto anterior](#)), gerando uma base de **8395 linhas** e **9 colunas**. 

Foram incluídas, em alguns casos, análises para os bairros:  
- **Jardim Botânico**  
- **Centro**  
- **Nova Aliança**  
- **Jardim Irajá**  
- **Sumarezinho**  
- **Vila Monte Alegre**  
- **Bonfim Paulista**  
- **Ribeirânia**  
- **Campos Elíseos**  

---

# 2 — Análises Estatísticas

Para a exploração da base, foram usadas as seguintes técnicas:  
- **Teste de hipóteses**  
- **Intervalo de confiança**  
- **Teste de normalidade entre dados**  
- **Análise da média, mediana e moda**  

Os bairros escolhidos foram: **Sumarezinho** e **Centro**, para o tipo de imóvel **apartamento**.  

---

# 3- Média, Mediana e Moda

## 3.1 — Bairro Centro

- **Total de imóveis**: 736  
- **Média**: R$ 402.076,73  
- **Mediana**: R$ 360.000,00  
  - Indica que 50% dos dados estão abaixo ou acima desse valor.  
- **Moda**: R$ 450.000,00  
  - Ou seja, há vários imóveis com esse valor.  
- **Coeficiente de variação**: 55,55%  
  - Representa uma variabilidade **menor** entre os dados.  

---

## 3.2 — Bairro Sumarezinho

- **Total de imóveis**: 118  
- **Média**: R$ 245.524,66  
- **Mediana**: R$ 230.000,00  
  - Indica que 50% dos dados estão abaixo ou acima desse valor.  
- **Moda**: R$ 170.000,00  
  - Ou seja, há vários imóveis com esse valor.  
- **Coeficiente de variação**: 29,73%  
  - Representa uma variabilidade **menor** entre os dados.  

---

# 4- Intervalo de Confiança

O **intervalo de confiança** é uma medida estatística que fornece uma margem de erro para avaliar a precisão e a confiabilidade das estimativas.  

Geralmente, utiliza-se um **nível de confiança de 95%**. Ou seja, em **100 testes**, espera-se que em **95 deles** os resultados estejam dentro da margem de erro.  



---

![Figura 1: Fórmula manual para o Intervalo de Confiança](https://static.wixstatic.com/media/123393_ce9f51d7cdc0450bb25c7aa5ffdebc15~mv2.png/v1/fill/w_740,h_316,al_c,lg_1,q_85,enc_avif,quality_auto/123393_ce9f51d7cdc0450bb25c7aa5ffdebc15~mv2.png)

![Figura 2: Tabela com os intervalos de confiança para os bairros selecionados](https://static.wixstatic.com/media/123393_6ea03bb22b8c4250bd32441aba47c16d~mv2.png/v1/fill/w_734,h_446,al_c,lg_1,q_85,enc_avif,quality_auto/123393_6ea03bb22b8c4250bd32441aba47c16d~mv2.png)



## Intervalo de Confiança

A tabela acima foi obtida para um nível de confiança de 95%, nós podemos afirmar que, no bairro Sumarezinho, a média dos imóveis pode estar entre **R$ 232.354,55** e **R$ 258.694,77** reais.

---

## Teste de Hipótese

O teste de hipótese é usado para a tomada de decisões sob uma amostra de dados. Ele consiste em formular duas hipóteses:

- **Hipótese Nula (H0):** É uma afirmação que se assume verdadeira até que seja refutada pelos dados.  
- **Hipótese Alternativa (Ha):** É a afirmação que se quer testar.  

O teste foi proposto da seguinte maneira: **os preços dos apartamentos do bairro Sumarezinho são menores que os do bairro Centro**. As amostras foram selecionadas aleatoriamente e foi utilizado o **teste Z**.

O **teste Z** é qualquer teste estatístico no qual a distribuição do teste estatístico sob a hipótese nula pode ser aproximada por uma distribuição normal. É um teste estatístico usado para inferência — capaz de determinar se a diferença entre a média da amostra e da população é grande o suficiente para ser estatisticamente significativa.

---

## Propostas de Testes de Hipóteses

**Objetivo:** Verificar se os preços dos apartamentos de até **60 m²** são maiores que os preços dos apartamentos com mais de **60 m²**.

- **m1:** média de preços para apartamentos menores ou iguais a **60 m²**  
- **m2:** média de preços para apartamentos maiores que **60 m²**  

**Formulação das hipóteses:**

- **H0:** m1 ≤ m2 → *Hipótese Nula*  
- **Ha:** m1 > m2 → *Hipótese Alternativa*  

---

![Figura 3: Código do teste de hipóteses para Verificar se os preços dos apartamentos de até 60 m2 são maiores que os apartamentos de 60 metros](https://static.wixstatic.com/media/123393_f71fc759bf9e49c7a1aa6399a87502a4~mv2.png/v1/fill/w_740,h_334,al_c,lg_1,q_85,enc_avif,quality_auto/123393_f71fc759bf9e49c7a1aa6399a87502a4~mv2.png)


Com base nos testes de hipóteses executados para os bairros citados anteriormente, obtemos a seguinte tabela:




![Resultados dos Testes de Hipóteses para cada bairro](https://static.wixstatic.com/media/123393_de3ae1f096a44c45bfcc08164ccecaea~mv2.png/v1/fill/w_720,h_921,al_c,q_90,enc_avif,quality_auto/123393_de3ae1f096a44c45bfcc08164ccecaea~mv2.png)


# Proposta de Teste de Hipóteses

**Objetivo:** Testar se o preço dos imóveis com três quartos é maior que o preço dos imóveis com 1 e 2 quartos.

## Definições:

1. **m1:** Média dos preços dos imóveis com três quartos  
2. **m2:** Média dos preços dos imóveis com 1 e 2 quartos  

## Hipóteses:

- **H0 (Hipótese Nula):** m1 ≤ m2 (A média dos preços dos imóveis com três quartos é menor ou igual à média dos preços dos imóveis com 1 e 2 quartos)  
- **H1 (Hipótese Alternativa):** m1 > m2 (A média dos preços dos imóveis com três quartos é maior que a média dos preços dos imóveis com 1 e 2 quartos)  

## Teste Estatístico:

Realizar um teste t para amostras independentes, assumindo ou não variâncias iguais, dependendo da análise preliminar da homogeneidade das variâncias.



![Resultados dos Testes de Hipóteses para cada bairro](https://static.wixstatic.com/media/123393_70e31d8d9a9741fabfaed1fc1f2acff8~mv2.png/v1/fill/w_740,h_438,al_c,lg_1,q_85,enc_avif,quality_auto/123393_70e31d8d9a9741fabfaed1fc1f2acff8~mv2.png)

Com base nos testes de hipóteses executados para os bairros citados anteriormente, obtemos a seguinte tabela:


![Figura 6: Código do teste de hipóteses para testar se o preço dos imóveis dos bairros de Sumarezinho e maior que os imóveis dos bairros da Vila Monte Alegre.](https://static.wixstatic.com/media/123393_6b0645caa9cd4256b7f0f14807c96409~mv2.png/v1/fill/w_720,h_752,al_c,q_90,enc_avif,quality_auto/123393_6b0645caa9cd4256b7f0f14807c96409~mv2.png)


## Resultado do Teste de Hipótese

**Resultado:** Aceitamos a **Hipótese Nula**.

Ou seja, os preços dos imóveis do bairro **Sumarezinho** são **menores ou iguais** em relação aos preços dos imóveis do bairro **Vila Monte Alegre**.
