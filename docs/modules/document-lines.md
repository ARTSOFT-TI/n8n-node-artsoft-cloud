# Linhas de Documento (Document Lines)

Modulo de gestao de linhas de documentos na API ARTSOFT Cloud Invoice. Permite listar, consultar, criar, atualizar e apagar linhas dentro de um documento existente.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar | GET | `/documents/{documentId}/lines` | Lista as linhas de um documento |
| Consultar | GET | `/documents/{documentId}/lines/{lineId}` | Obtem uma linha especifica |
| Criar | POST | `/documents/{documentId}/lines` | Cria uma nova linha no documento |
| Atualizar | POST | `/documents/{documentId}/lines/{lineId}` | Atualiza uma linha existente |
| Apagar | DELETE | `/documents/{documentId}/lines/{lineId}` | Elimina uma linha |

**Nota:** Tanto a criacao como a atualizacao usam o metodo POST.

## Parametros de Identificacao

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| documentId | string | Sim (todas as operacoes) | ID do documento pai |
| lineId | string | Sim (consultar/atualizar/apagar) | ID da linha do documento |

## Parametros de Listagem

| Campo | Tipo | Descricao |
|-------|------|-----------|
| returnAll | boolean | Devolve todos os resultados (o node percorre as paginas internamente) |
| limit | number | Maximo de resultados a devolver (default: 50; so aparece se `returnAll` estiver desligado) |

**Nota:** o endpoint `GET /documents/{id}/lines` nao e paginado (devolve todas as linhas) e ignora `page`, `size` e `filter`. O node aplica `limit` localmente.

## Campos para Criar / Atualizar

### Campos Principais (obrigatorios)

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| lineIdSku | number | Sim | ID do produto/SKU |
| lineQuantity | number | Sim | Quantidade (default: 1, precisao: 2 casas decimais) |
| lineValUn | number | Sim | Valor unitario liquido (precisao: 2 casas decimais) |

### Campos Adicionais (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| valUnGross | number | 0 | Valor unitario bruto (antes de descontos) |
| discountTotalPercent | number | 0 | Percentagem de desconto total da linha |

### Limite de Credito

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| confirmCreditLimit | boolean | false | Confirmar ultrapassagem do limite de credito |

O parametro `confirmCreditLimit` e enviado como query parameter (`?confirmCreditLimit=true`), nao no corpo do pedido. Aplica-se tanto a criacao como a atualizacao.

## Comportamento Especial

### Relacao com Documentos

As linhas de documento sao sempre criadas dentro de um documento existente. O fluxo tipico e:

1. Criar o cabecalho do documento (ver modulo documents)
2. Adicionar as linhas necessarias
3. Atualizar/assinar o documento

### Atualizacao usa POST (nao PUT)

A atualizacao de linhas usa `POST /documents/{documentId}/lines/{lineId}` em vez de PUT. O payload enviado na atualizacao tem a mesma estrutura da criacao.

### Payload minimo

O corpo do pedido contem apenas os campos essenciais. A API calcula automaticamente os totais, impostos e outros campos derivados.

## Exemplo de Payload (Criar)

```json
{
  "idSku": 42,
  "quantity": 3,
  "valUn": 19.99
}
```

## Exemplo de Payload (Criar com campos adicionais)

```json
{
  "idSku": 42,
  "quantity": 3,
  "valUn": 19.99,
  "valUnGross": 24.99,
  "discountTotalPercent": 10.00
}
```
