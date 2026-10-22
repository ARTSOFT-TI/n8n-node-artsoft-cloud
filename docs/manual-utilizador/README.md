# Manual do Utilizador — ARTSOFT Cloud Invoice no n8n

Este manual explica como instalar, configurar e utilizar o *node* **ARTSOFT** no n8n para ligar o **ARTSOFT Cloud Invoice** a outras aplicações e automatizar tarefas (por exemplo, criar um cliente quando recebe um pedido, ou listar as faturas do mês).

> **O que é o n8n?** Uma ferramenta de automação onde se desenham "fluxos de trabalho" (*workflows*) ligando passos, chamados *nodes*. O *node* **ARTSOFT** é o passo que fala com o seu ARTSOFT Cloud Invoice.

## Índice

| # | Capítulo | Para quê |
|---|----------|----------|
| 1 | [Instalação](01-instalacao.md) | Instalar, atualizar e remover o node |
| 2 | [Configuração](02-configuracao.md) | Ligar o n8n à sua conta ARTSOFT |
| 3 | [Utilização básica](03-utilizacao-basica.md) | Como escolher uma operação, ler resultados e tratar erros |
| 4 | [Clientes](04-clientes.md) | Listar, consultar, criar, atualizar e apagar clientes |
| 5 | [Fornecedores](05-fornecedores.md) | Idem, para fornecedores |
| 6 | [Produtos](06-produtos.md) | Idem, para artigos |
| 7 | [Vendedores](07-vendedores.md) | Idem, para vendedores |
| 8 | [Documentos](08-documentos.md) | Faturas e compras: listar, criar, atualizar e apagar |
| 9 | [Linhas de documento](09-linhas-de-documento.md) | Artigos, quantidades e preços dentro de um documento |
| 10 | [Conta corrente](10-conta-corrente.md) | Débitos, créditos e regularizações |
| 11 | [Exemplos práticos](11-exemplos.md) | Fluxos prontos a reproduzir |
| 12 | [Problemas frequentes](12-problemas-frequentes.md) | Mensagens de erro e como resolver |

## Resumo do que o node permite fazer

| Área (*Resource*) | Operações disponíveis |
|-------------------|-----------------------|
| **Cloud — Customer** (Cliente) | List, Get, Create, Update, Delete |
| **Cloud — Supplier** (Fornecedor) | List, Get, Create, Update, Delete |
| **Cloud — Product** (Produto) | List, Get, Create, Update, Delete |
| **Cloud — Salesperson** (Vendedor) | List, Get, Create, Update, Delete |
| **Cloud — Document** (Documento) | List Invoices, List Invoices by SAFT Type, List Purchases, List Purchases by SAFT Type, Get, Create Header, Update, Delete |
| **Cloud — Document Line** (Linha de documento) | List, Get, Create, Update, Delete |
| **Cloud — Current Account** (Conta corrente) | List Customers, List Suppliers, Get, Create Debit, Create Credit, Update, Delete |

## Notas sobre a linguagem do ecrã

- O ecrã do node aparece **em inglês**. Neste manual, os nomes que vê no ecrã estão em **negrito e em inglês**, seguidos da explicação em português.
- Alguns termos seguem a terminologia ARTSOFT, por exemplo *Third Party* (terceiro = cliente ou fornecedor), *SAFT* e *MB References* (referências Multibanco).

## Pré-requisitos

- Uma instância n8n (n8n Cloud ou instalação própria) onde tenha permissões para instalar *community nodes* (normalmente o proprietário ou um administrador).
- Uma subscrição ARTSOFT Cloud Invoice ativa.
- O **NIF** com que a sua instância ARTSOFT Cloud Invoice está registada.
- Uma **chave de acesso** (*API Key*) do ARTSOFT Cloud Invoice. Cria-se nas configurações da Empresa, na sua conta do ARTSOFT Cloud (ver [Configuração](02-configuracao.md)).

## Limitações

- O node devolve os dados tal como o ARTSOFT Cloud Invoice os fornece; não existem tradução ou conversão de formatos.
- Os nomes dos campos no ecrã podem mudar entre versões, mas os fluxos já criados continuam a funcionar.
- A manutenção deste manual acompanha a versão **2.0.x** do node. Em caso de dúvida, o ecrã do n8n é sempre a referência.
