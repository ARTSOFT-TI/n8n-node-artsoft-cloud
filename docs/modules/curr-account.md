# Conta Corrente (Curr Account)

Modulo de gestao de contas correntes na API ARTSOFT Cloud Invoice. Permite listar contas de clientes e fornecedores, consultar, criar debitos e creditos, atualizar e apagar lancamentos.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar Clientes | GET | `/curr-account/customer` | Lista contas correntes de clientes |
| Listar Fornecedores | GET | `/curr-account/supplier` | Lista contas correntes de fornecedores |
| Consultar | GET | `/curr-account/{id}` | Obtem uma conta corrente pelo ID |
| Criar Debito | POST | `/curr-account/entry` | Cria lancamento de debito manual |
| Criar Credito | POST | `/curr-account/regul` | Cria lancamento de credito/regularizacao |
| Atualizar | POST | `/curr-account/{id}` | Atualiza uma conta corrente |
| Apagar | DELETE | `/curr-account/{id}` | Elimina uma conta corrente |

**Nota:** A atualizacao usa POST (nao PUT).

## Parametros de Listagem

| Campo | Tipo | Descricao |
|-------|------|-----------|
| filters | collection | Filtros opcionais: `search`, `filter`, `sort`, `direction` (ver abaixo) |
| returnAll | boolean | Devolve todos os resultados (o node percorre as paginas internamente) |
| limit | number | Maximo de resultados a devolver (default: 50; so aparece se `returnAll` estiver desligado) |

### Filtros (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| search | string | '' | Termo de pesquisa |
| filter | string | '' | Expressao de filtro |
| sort | string | '' | Campo de ordenacao |
| direction | options | asc | Direcao da ordenacao (asc/desc) |

## Campos para Criar Debito / Credito

Os campos opcionais ficam na colecao **Additional Fields** (em branco por defeito). Na atualizacao, so sao alterados os campos que forem adicionados a colecao.

### Campos Principais

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| caIdSerie | number | Sim | ID da serie de configuracao |
| caIdThirdParty | number | Sim | ID do cliente ou fornecedor |
| caValCurrAcc | number | Sim | Valor da conta corrente (precisao: 2 casas decimais) |

### Campos Adicionais (colecao opcional -- criacao)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| vencDate | dateTime | '' | Data de vencimento |
| payDate | dateTime | '' | Data de pagamento |
| isTotalManualMode | boolean | false | Modo manual de calculo de total |
| fiscalNumber | string | '' | NIF do terceiro |
| balance | number | 0 | Saldo total (precisao: 2 casas decimais) |
| docDate | dateTime | data atual | Data do documento |
| comment | string | '' | Observacoes |
| docReference | string | '' | Referencia ao documento |

### IVA do Lancamento (fixedCollection -- debito e atualizacao)

Disponivel nas operacoes de criacao de debito e atualizacao.

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| vatType | options | NORMAL | Tipo de IVA (ISENTO, REDUZIDA, INTERMEDIA, NORMAL) |
| vatBase | number | 0 | Valor base de incidencia do IVA |
| vatTypeExemption | number | 0 | ID da isencao de IVA (apenas para tipo Isento) |

### Itens a Regularizar (fixedCollection -- apenas credito)

Disponivel apenas na operacao de criacao de credito.

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| id | number | 0 | ID do lancamento a regularizar |
| regulValue | number | 0 | Valor a regularizar |
| value | number | 0 | Valor original |
| balance | number | 0 | Saldo |
| type | string | CREDITOS_CLI | Tipo do lancamento |
| serie | string | '' | Serie do documento (ex: B0022/22) |
| date | dateTime | '' | Data |
| vencDate | dateTime | '' | Data de vencimento |
| idDocFr | number | 0 | ID do documento de faturacao |
| isRegulBy | boolean | false | Indica se e regularizado por outro lancamento |
| hasTaxes | boolean | false | Indica se tem impostos |

## Campos para Atualizar

### Campos Principais

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| currAccountId | string | Sim | ID da conta corrente |

### Campos Adicionais (colecao opcional -- atualizacao)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| docDate | dateTime | '' | Data do documento |
| vencDate | dateTime | '' | Data de vencimento |
| payDate | dateTime | '' | Data de pagamento |
| idSerie | number | 0 | ID da serie |
| idThirdParty | number | 0 | ID do terceiro |
| thirdPartyName | string | '' | Nome do terceiro |
| invoiceNumber | string | '' | Numero da fatura |
| state | options | FINALIZED | Estado (FINALIZED / DRAFT) |
| isSigned | boolean | false | Indica se esta assinado |
| isTotalManualMode | boolean | false | Modo manual de calculo de total |
| salesPersonId | number | 0 | ID do vendedor |
| salesPersonName | string | '' | Nome do vendedor |
| salesPersonFiscalNumber | string | '' | NIF do vendedor |
| comment | string | '' | Observacoes |
| docReference | string | '' | Referencia ao documento |
| valCurrAcc | number | 0 | Valor da conta corrente |
| balance | number | 0 | Saldo total |

### Itens a Regularizar (fixedCollection -- atualizacao)

Semelhante a lista de regularizacao da criacao de credito, com um campo adicional:

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| editable | boolean | true | Indica se o item e editavel |
| docFrInvoiceNumber | string | '' | Numero de fatura do documento de faturacao |

(Todos os outros campos sao identicos a lista de regularizacao da criacao.)

## Comportamento Especial

### Conversao de Datas

As datas sao convertidas automaticamente para o formato `YYYY-MM-DD` atraves da funcao `toDateStr`. Formatos suportados na entrada:
- `YYYY-MM-DD` -- mantido inalterado
- `DD/MM/YYYY` -- convertido para `YYYY-MM-DD`
- Qualquer formato reconhecido por `new Date()` -- convertido para `YYYY-MM-DD`
- Vazio -- usa a data atual

### Diferenca entre Debito e Credito

- **Debito** (`/curr-account/entry`) -- cria um lancamento simples. O campo `toRegulList` e enviado como array vazio. Pode incluir dados de IVA (`currAccEntryVat`).
- **Credito** (`/curr-account/regul`) -- cria um lancamento de regularizacao. Pode incluir uma lista de documentos a regularizar (`toRegulList`).

### Atualizacao usa POST

A atualizacao usa `POST /curr-account/{id}` em vez de PUT. O corpo do pedido inclui automaticamente `existingTaxData: []`.

### IVA com Isencao

Quando o `vatType` e `ISENTO`, o campo `vatTypeExemption` e convertido para um array `vatTypeExemptions: [id]` no payload enviado a API.

## Exemplo de Payload (Criar Debito)

```json
{
  "idSerie": 1,
  "idThirdParty": 100,
  "valCurrAcc": 500.00,
  "docDate": "2026-03-30",
  "comment": "Debito manual",
  "docReference": "REF-001",
  "toRegulList": [],
  "currAccEntryVat": [
    {
      "vatType": "NORMAL",
      "vatBase": 406.50
    }
  ]
}
```

## Exemplo de Payload (Criar Credito)

```json
{
  "idSerie": 2,
  "idThirdParty": 100,
  "valCurrAcc": 250.00,
  "docDate": "2026-03-30",
  "comment": "Regularizacao",
  "toRegulList": [
    {
      "id": 55,
      "regulValue": 250.00,
      "value": 500.00,
      "balance": 250.00,
      "type": "CREDITOS_CLI",
      "isRegulBy": false,
      "hasTaxes": false,
      "idDocFr": 0,
      "docFrInvoiceNumber": null,
      "regulDate": null
    }
  ]
}
```
