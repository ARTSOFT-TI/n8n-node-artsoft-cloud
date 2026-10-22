# 9. Linhas de documento

Área: **Cloud — Document Line**

Uma linha é um artigo dentro de um documento (quantidade e preço). As linhas só podem ser criadas dentro de um documento **que já existe** (ver [capítulo 8](08-documentos.md)).

| Operação | O que faz |
|----------|-----------|
| **List** | Lista as linhas de um documento |
| **Get** | Devolve uma linha |
| **Create** | Acrescenta uma linha ao documento |
| **Update** | Altera uma linha |
| **Delete** | Apaga uma linha |

## 9.1 Identificar o documento e a linha

| Campo | Obrigatório em | Descrição |
|-------|----------------|-----------|
| **Document ID** | Todas as operações | ID do documento a que a linha pertence. |
| **Line ID** | Get, Update, Delete | ID da linha. |

## 9.2 List — listar linhas

A listagem de linhas usa campos próprios (diferentes das outras listas):

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Page** | Número da página. **Começa em 0.** | `0` |
| **Page Size** | Quantas linhas por página. | `10` |
| **Filter** | Condição de filtragem. | vazio |

Para obter a página seguinte, aumente **Page** em 1.

## 9.3 Create e Update — criar ou alterar linha

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Product ID (SKU)** | Sim | Número (ID) do produto. É o ID interno, não o código SKU. |
| **Quantity** | Sim | Quantidade. Por omissão `1`. |
| **Unit Price** | Sim | Preço unitário líquido (sem desconto). |
| **Confirm Credit Limit** | Não | Se ligado, confirma que aceita ultrapassar o limite de crédito do cliente. Por omissão, desligado. |

**Additional Fields** (opcionais):

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Gross Unit Price** | Preço unitário bruto (antes de descontos). | `0` |
| **Total Discount (%)** | Desconto total da linha, em percentagem. | `0` |

Os totais, impostos e restantes valores são calculados pelo ARTSOFT.

## 9.4 Delete

Apaga a linha indicada (**Document ID** + **Line ID**).

## 9.5 Dicas

- Para ver o resultado final de um documento depois de acrescentar linhas, use **Cloud — Document → Get**.
- O **Update** de uma linha envia os valores de **Product ID (SKU)**, **Quantity** e **Unit Price** — preencha-os sempre, mesmo que só queira alterar um deles.
