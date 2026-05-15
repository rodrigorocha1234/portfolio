---
layout: project
title: Clustering de comentários (Multicanal) de vários comentários de vídeo do youtube usando deep learning e kmeans
date: 2026-03-01
image: /assets/img/posts/cluster_canais_dl/thumb.png
description: ""
tags: ['deep_learning', 'pytorch', 'python', 'youtube', 'restricted_boltzman_machines', 'kmeans']
---


## Objetivo
- Conhecer a rede neural Boltzman machiners
- Conhecer o pytorch
- Organizar a extração de dado e guardar no minio s3
- Registrar, experimentos, métricas e modelos com Mlflow
- Identificar padrões de linguagem , tópicos e tendencias de cada canal e vídeo
- Interpretar para a equipe de negócio

## Tecnologias Utilizadas
- 🐍 Python (PyTorch, Scikit-learn, SpaCy, NumPy, Pandas)
- 🧠 SpaCy para processamento de linguagem natural
- ⚡ Boltzmann Machines para extração de representações latentes
- 📊 MLflow para registro de experimentos, métricas e artefatos
- ☁️ MinIO (S3) para armazenamento de datasets e modelos
- 📈 Plotly / Matplotlib / UMAP / t-SNE para visualizações interativas
- 🎥 APIs do YouTube para coleta de comentários

## Estrutura do Pipeline de coleta

1 – Coleta de comentários: Usar a api do youtube para buscar os comentários seguindo a sequência busca id_canal, busca_id_video, comentários.

2 – Pré-processamento: Remolçao de links, emojis, potuação, stopwords. Lematização. Tratamento para deixar em mínusculos e salvar o dataset processado no Minio.

3 – Vetorização embedings: TF-IDF ou embeddings (Word2Vec, FastText, GloVe)., Boltzman Machine para gerar representação lattente e registrar no mlflow o aterfatro

4- Experimentos com Mlflow: Registrar: hiperparâmetros RBM (n_hidden, learning_rate), clustering (n_clusters, algoritmo), métricas (Silhouette, Calinski-Harabasz) e salvar gráficos, embeddings e artefatos no MinIO via Mlflow.

5 -  Clustering: K-Means sobre embeddings latentes, Salvar labels e embeddings finais no MinIO e Registrar métricas de clusterização no Mlflow.

6 - Interpretação de Clusters: Extração de comentários representativos, palavras-chave top-n por cluster. ags emergentes podem ser usadas para auto-tagging futuro .

7 – Visualização: t-SNE dos embeddings., Cores = cluster, símbolos = canal. E Salvar figuras no MinIO e registrar no Mlflow.

8 - Comparação entre Canais / Vídeos: Comparação entre Canais / Vídeos,  Detectar segmentos comuns ou exclusivos. Detectar segmentos comuns ou exclusivos.

## Construção do pipeline

Para a extração dos comentários do youtube, eu coletei comentários de vídeo  desde o dia 01 de janeiro de 2026  usando o padrão de projeto cadeia de responsábilidade.  Este padrão me permitiu criar classes, onde cada classe representa uma etapa de processamento do pipeline e os método, indicam o tipo de processamento em cada etapa, quando aplicavel, além de caso ela de erro em alguma etapa de processamento, a cadeia é interrompida.

## Estrutura da rede neural

Para esse projeto, eu construi uma rede neural do tipo Boltzman Machines. Ela é uma rede neural que aprende uma representação latente doc comentários.

- Cada neurônio oculto pode se tornar um neurônio especialista, capturando padrões de liguagem ou tópicos
- Esta representatção facilita a clusterização, visualização e interpretação de tendências em multiplos canais e vídeos.
- Logo em seguida, usi o kmeans para fazer os agrupamentos dos comentários.
      
## Resultados obtidos

Com base no treinamento da rede neural, eu separe em seguintes clusters:

### **Cluster 0: Promoção:**  
Esse cluster está relacionado a links de  promoções, afiiados e parcerias. Aparecem referencias a plataforma de lojas e streaming como, **instant Gaming**, **Twitch**, **live pix** e **instragram**.  
Expressão como “**Parceira oficial do canal**” e “**oficial canall https**” indicam comentários promocionais ou automático de parceiros, ou seja, comentários de marketing e divulgação. Não há opinião sobre o conteúdo do vídeo.  

Palavras chaves:  "**instant gaming**", "**canal https**", "**parceira oficial**", "**livepix gg**", "**lives twitch**".  
Nota: Expressões como “valeu”, “Bora”, “Salve”, mesmo pertecente ao cluster 0, se aglomeraram e ficaram distante dos outros pontos.

### **Cluster 1 : Dicas de gameplay e Gestão de base**  
É grupo onde os inscritos discutem sobre as mecanicas do jogo. Apresenta linguagem causal com abreviações e também interação com o criador como: “Você vai e você pode”, ou seja, é um cluster de feedback e sugestões.  

Palavras chaves : "**fábrica precisa**",  "**precisa crescer**",  "**usina nuclear**", "**vc pode**".

### **Cluster 2: Feedback:**  
É o grupo que apresenta feedbacks posivos e discursão de lore da série. Apresenta cuprimentos sazonais de feliza natal e ano novo.  

Palavras chaves: **"pra fazer"**, **"vc vai"**, **"pra vc"**, **"próximo vídeo"**, **"jogo bom"**, **"desse jogo"**, **"nesse jogo"**, **"pra frente"**, **"vai dar"**, **"ai vc"**


### **Cluster 3: Comentários técnicos**  
É o grupo onde há discusão sobre construção de base, relacionados a simuladores de estrátegia e construção de cidades/ jogos complexos

Palavras chaves: "**pra fazer**", "**dá pra**", "**main bus**", "**painel solar**", "**usina nuclear**", "**cidade**”,  “**acho ficaria**”, “**japonesa**",



{% include youtube.html 
   id="lAP82v2l2HQ" 
   title="Monitoramento das posições dos ônibus em tempo real"
%}

