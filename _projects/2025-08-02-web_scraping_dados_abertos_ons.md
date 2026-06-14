---
layout: project
title: "Projeto: Web Scraping em massa com python de dados completos da ONS"
date: 2025-08-02
image: /assets/img/posts/web_scraping_ons/ons.png
description: "Criação de um pipeline de dados fácil de realizar manutenção — estruturado, modular e escalável"
tags: ['python', 'beautifulsoup', 'webscraping','padrão_de_projeto', 'ons']
---




## 1. Objetivo do Projeto

- Criar um pipeline de dados fácil de realizar manutenção — estruturado, modular e escalável.
- Discutir o padrão de projeto **Chain of Responsibility** (Cadeia de Responsabilidade).
- Salvar os dados do site da ONS **(https://dados.ons.org.br/)** em um banco de dados.
- Automatizar a carga para inserir apenas novos registros.
- Registrar logs do pipeline nos níveis: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`.
- Explorar o padrão de projeto Cadeia de Responsabilidade (Chain of Responsibility)

---

## 2. Arquitetura / Estrutura Técnica

### 2.1 Tecnologias Usadas

- **Python 3.10**
- **Requests** / **BeautifulSoup** → Extração dos dados (Web Scraping)
- **Pandas** → Manipulação dos dados tabulares
- **MySQL** → Armazenamento dos dados
- **Logging** → Registro de logs estruturado

---

## 3. Arquitetura do Pipeline

### 3.1 Diagrama de Classe

[![Diagrama de Classe](https://github.com/rodrigorocha1/web_scraping_dados_abertos_ons/blob/main/docs/diagrama_classe_ons.jpg?raw=true)](https://github.com/rodrigorocha1/web_scraping_dados_abertos_ons/blob/main/docs/diagrama_classe_ons.jpg?raw=true)

A figura acima mostra a organização do projeto, com destaque para o modulo handler_pipeline,
onde ele mostra a organização de cada processo do web scraping. O modulo contexto, é responsável
por receber as variáveis em cada processo. Modulo de operações no qual é responsável por agrupar 
as operações do banco, o modulo de conexão, responsável pela manupulação de cada conexão do banco,
com destaque a flexibilidade da troca de banco de dados e o modulo web_scraping_service, responsável
por gerenciar o tipos de web scraping.  

### 3.2 Diagrama de Atividade

[![Diagrama de Atividade](https://github.com/rodrigorocha1/web_scraping_dados_abertos_ons/blob/main/docs/diagrama_de_atividade.jpg?raw=true)](https://github.com/rodrigorocha1/web_scraping_dados_abertos_ons/blob/main/docs/diagrama_de_atividade.jpg?raw=true)


> O diagrama de atividade mostra o fluxo completo do pipeline:
>
> 1. **Checar conexão com o banco**: caso bem-sucedida, o processo continua. Caso contrário, é encerrado.
> 2. **Checar conexão com o site da ONS**: se a conexão for válida, continua. Caso contrário, encerra o scraping.
> 3. **Coletar links do site**: obtenção das URLs dos arquivos CSV.
> 4. **Guardar dados**: os dados dos CSVs são armazenados em tabelas no banco de dados.

---

### 3.3 Estrutura do Banco

#### Tabela `param_id_max`

Responsável por armazenar metadados de controle de cada CSV extraído da ONS.

| Campo                | Descrição |
|---------------------|-----------|
| `NOME_TABELA`       | Nome da tabela criada com base na URL do CSV (ex: `balanco_dessem_detalhe`) |
| `id_max`            | Índice máximo encontrado no CSV |
| `flag_url_sem_data` | Verdadeiro se a URL não possui data; falso caso contrário |
| `data_atualizacao`  | Data/hora da última atualização da linha |

```sql
CREATE TABLE `param_id_max` (
  `NOME_TABELA` varchar(400) DEFAULT NULL,
  `id_max` int DEFAULT NULL,
  `flag_url_sem_data` tinyint(1) DEFAULT NULL,
  `data_atualizacao` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```


#### Tabelas de logs
O script e a tabela abaixo mostra como está a organização do registro de logs
```sql

CREATE TABLE `logs` (
  `timestamp` datetime NOT NULL,
  `level` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `logger_name` varchar(100) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `func_name` varchar(100) NOT NULL,
  `line_no` int NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `mensagem_de_excecao_tecnica` text,
  `requisicao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status_code` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

| Campo                     | Descrição                                                                                   |
|--------------------------|---------------------------------------------------------------------------------------------|
| `timestamp`              | Data e hora em que o log foi registrado.                                                    |
| `level`                  | Nível do log (por exemplo: DEBUG, INFO, WARNING, ERROR, CRITICAL).                         |
| `message`                | Mensagem principal do log.                                                                  |
| `logger_name`            | Nome do logger que gerou o log.                                                             |
| `filename`               | Nome do arquivo onde o log foi gerado.                                                      |
| `func_name`              | Nome da função/método dentro do código onde o log foi registrado.                          |
| `line_no`                | Número da linha no arquivo de código onde o log foi emitido.                               |
| `url`                    | URL da requisição, caso o log esteja associado a um contexto de requisição HTTP. Pode ser nula. |
| `mensagem_de_excecao_tecnica` | Stack trace ou mensagem técnica de erro, quando aplicável.                          |
| `requisicao`             | Corpo da requisição HTTP, headers ou payload relevante. Pode ser extenso.                   |
| `status_code`            | Código de status HTTP retornado (como 200, 404, 500). Nulo quando o log não está associado a uma resposta HTTP. |


## 4. Principais Funcionalidades

### 4.1 Requisitos Funcionais

- Implementar carga completa dos dados.
- Implementar carga fracionada dos dados.
- Validar links CSV para verificar:
  - Se contêm a data atual.
  - Se contêm o ano atual.
  - Se são links genéricos (sem data).
- Verificar nos dados extraídos registros novos por `id_index`.
- Salvar os dados em um banco de dados MySQL.

### 4.2 Requisitos Não Funcionais

- O código deve seguir os princípios **SOLID**.
- Utilizar o padrão **Cadeia de Responsabilidade** (*Chain of Responsibility*).
- Código com **tipagem estática** e **documentação clara**.
- O sistema deve usar o banco de dados **MySQL**
- Suporte extensível a outros sites RSS para extração de dados.
- Todas as **credenciais de acesso devem estar protegidas**.

---

## 5. Exemplo Simplificado do Código

```python
from time import sleep
from typing import cast, Union, List, Tuple
from datetime import datetime
from src.utlis.llog_factory import logger
from src.banco_service.operacoes.i_operacao import IOperacao
from src.contexto.contexto_pipeiine import ContextoPipeline
from src.handler_pipeline.handler import Handler
import pandas as pd


class GuardaDadosBancoHandler(Handler, ):

    def __init__(self, operacao_banco: IOperacao, carga_completa: bool):
        super().__init__()
        self.__carga_completa = carga_completa
        self.__operacao_banco = operacao_banco
        self.__data_atual = datetime.now().date()

    def __obter_dataframe_filtrado(self, tabela: str, dataframe_csv: pd.DataFrame) -> pd.DataFrame:

        if not self.__carga_completa:
            sql = """
                   select *
                   FROM param_id_max pim
                   where pim.NOME_TABELA = %s
               """
            param = (tabela,)

            _, id_param_banco, flag_url_sem_data, data_atualizacao = self.__operacao_banco.executar_consulta_simples(
                sql=sql,
                param=param
            )

            id_param_banco = cast(int, id_param_banco)
            flag_url_sem_data = cast(bool, flag_url_sem_data)
            data_atualizacao = cast(datetime, data_atualizacao)

            dataframe_csv = dataframe_csv[dataframe_csv['id_param'] > id_param_banco] \
                if flag_url_sem_data \
                else (
                dataframe_csv[dataframe_csv['id_param'] > id_param_banco]
                if self.__data_atual == data_atualizacao.date()
                else
                dataframe_csv
            )
        return dataframe_csv

    def __gravar_dados_dataframe(
            self,
            tabela: str,
            colunas_sql: str,
            placeholders: str,
            url_csv: str,
            dataframe_csv: pd.DataFrame
    ):
        sql = f"""
               INSERT INTO `{tabela}` ({colunas_sql})
               VALUES ({placeholders})
           """

        logger.info(
            f'Inserindo dados na tabela {tabela}',
            extra={
                'url': url_csv
            }
        )
        dataframe_csv = dataframe_csv.where(pd.notnull(dataframe_csv), None)
        valores = []
        for row in dataframe_csv.itertuples(index=False, name=None):
            nova_linha = tuple(None if (pd.isna(x) or (isinstance(x, float) and x != x)) else x for x in row)
            valores.append(nova_linha)
        self.__operacao_banco.salvar_em_lote(sql=sql, param=valores)

    def __gravar_id(self, dataframe_csv: pd.DataFrame, tabela: str):
        id_max = int(dataframe_csv['id_param'].max())
        sql = """

                                   UPDATE param_id_max
                                   SET id_max = %s
                                   WHERE NOME_TABELA = %s

                               """
        params = (id_max, tabela)
        self.__operacao_banco.salvar_consulta(sql, params)

    def __obter_parametros(self, url_csv: str) -> Tuple[str, pd.DataFrame, str, str]:
        tabela = url_csv.split('/')[-2].replace('-', '_')
        sleep(3)
        dataframe_csv = pd.read_csv(url_csv, sep=';', encoding='utf-8')
        dataframe_csv = dataframe_csv.reset_index()
        dataframe_csv = dataframe_csv.rename(
            columns={
                'index': 'id_param'
            }
        )

        colunas = list(dataframe_csv.columns)
        colunas_sql = ', '.join(colunas)
        placeholders = ', '.join(['%s'] * len(colunas))
        return tabela, dataframe_csv, colunas_sql, placeholders

    def executar_processo(self, contexto: ContextoPipeline) -> bool:
        urls_csv = contexto.lista_sites_csv
        for url_csv in urls_csv:
            tabela, dataframe_csv, colunas_sql, placeholders = self.__obter_parametros(url_csv=url_csv)

            dataframe_filtrado = self.__obter_dataframe_filtrado(tabela=tabela, dataframe_csv=dataframe_csv)
            print(dataframe_filtrado)
            if not dataframe_filtrado.empty:
                self.__gravar_dados_dataframe(
                    tabela=tabela,
                    dataframe_csv=dataframe_filtrado,
                    colunas_sql=colunas_sql,
                    placeholders=placeholders,
                    url_csv=url_csv,
                )
                self.__gravar_id(dataframe_csv=dataframe_filtrado, tabela=tabela)
            placeholders = ''
        return True


```




## 6. Vídeo com a demonstração do projeto 

{% include youtube.html 
   id="0MCuLV8ve30" 
   title="Projeto: Web Scraping em massa com python de dados completos da ONS"
%}





[Link do reposítório](https://github.com/rodrigorocha1234/web_scraping_dados_abertos_ons)