# Clientes (Customers)

Modulo de gestao de clientes na API ARTSOFT Cloud Invoice. Permite listar, consultar, criar, atualizar e apagar clientes.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar | GET | `/customers/` | Lista todos os clientes com paginacao |
| Consultar | GET | `/customers/{id}` | Obtem um cliente pelo ID |
| Criar | POST | `/customers/` | Cria um novo cliente |
| Atualizar | PUT | `/customers/{id}` | Atualiza um cliente existente |
| Apagar | DELETE | `/customers/{id}` | Elimina um cliente |

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

## Campos para Criar / Atualizar

Os campos opcionais ficam na colecao **Additional Fields** (em branco por defeito). Na atualizacao, so sao alterados os campos que forem adicionados a colecao.

### Campos Principais (obrigatorios na criacao)

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| customerNumber | number | Sim | Numero sequencial do cliente |
| customerName | string | Sim | Nome completo do cliente |
| customerShortName | string | Sim | Abreviatura do nome |
| customerFiscalNumber | string | Sim | NIF - Numero de identificacao fiscal |

### Campos Adicionais (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| birthDate | string | '' | Data de nascimento (ISO 8601) |
| status | options | ACTIVE | Estado (ACTIVE / INACTIVE) |
| inactive | boolean | false | Marca como inativo |
| customerStatusId | number | 1 | ID do estado do cliente |
| documentDeliveryEmail | string | '' | Email para entrega de documentos |
| creditLimit | string | '' | Limite de credito |
| discount | string | '' | Desconto |
| exemptVatId | string | '' | ID de isencao de IVA |
| expeditionModeId | string | '' | ID do modo de expedicao |
| observation1 | string | '' | Observacoes |
| url | string | '' | URL |
| noMbReferences | boolean | false | Sem referencias multibanco |
| anonymous | boolean | false | Cliente anonimo |
| privateRecord | boolean | false | Registo privado |
| phoneNumberCountryId | number | 620 | Codigo do pais do telefone |
| mobileNumberCountryId | number | 620 | Codigo do pais do telemovel |
| isCompany | boolean | false | Indica se o cliente e uma empresa |
| email | string | '' | Email do cliente |
| address | string | '' | Endereco do cliente |
| locality | string | '' | Localidade |
| postalCode | string | '' | Codigo postal (ex: 1000-001) |
| district | number | 0 | ID do distrito |
| county | number | 0 | ID do concelho |
| parish | number | 0 | ID da freguesia |
| countryRegionId | number | 0 | ID da regiao do pais |
| countryCode | number | 620 | Codigo do pais (620 = Portugal) |
| tradeName | string | '' | Nome comercial da empresa |
| eori | string | '' | Numero EORI |

## Comportamento Especial

### Atualizacao (Update)

A operacao de atualizacao executa dois pedidos HTTP:

1. **GET** `/customers/{id}` -- obtem o estado atual do cliente
2. **PUT** `/customers/{id}` -- envia o payload completo com as alteracoes aplicadas

Apenas os campos preenchidos pelo utilizador sobrescrevem os valores existentes. Os restantes campos mantem os seus valores originais. Isto garante que uma atualizacao parcial nao apaga dados existentes.

### Payload automatico

Na criacao, os seguintes campos sao preenchidos automaticamente:
- `inactivationDate`, `createdAt`, `updatedAt` -- preenchidos com a data/hora atual (ISO)
- `createdBy`, `updatedBy` -- valor 0
- `concealmentReason` -- null
- Arrays vazios: `addresses`, `staffs`, `salespersons`, `seriesIds`, `thirdPartyCAEList`

## Exemplo de Payload (Criar)

```json
{
  "number": 1001,
  "name": "Empresa Exemplo Lda",
  "shortName": "Exemplo",
  "birthDate": "",
  "status": "ACTIVE",
  "inactive": false,
  "isCompany": true,
  "inactivationDate": "2026-03-30T10:00:00.000Z",
  "flags": {},
  "email": "geral@exemplo.pt",
  "documentDeliveryEmail": "",
  "mainAddress": {
    "name": "",
    "status": "ACTIVE",
    "parish": 0,
    "county": 0,
    "district": 0,
    "postalCodeNumeric": "1000-001",
    "countryCode": 620,
    "countryRegionId": 0,
    "address": "Rua Exemplo, 123",
    "locality": "Lisboa"
  },
  "taxPayer": {
    "fiscalNumber": "123456789",
    "countryCode": 620,
    "status": 0,
    "valid": true
  },
  "companyDetails": {
    "eori": "",
    "tradeName": "Exemplo Comercial"
  },
  "customerStatusId": 1,
  "exemptVatId": "",
  "expeditionModeId": "",
  "addresses": [],
  "staffs": [],
  "salespersons": [],
  "observations": { "observation1": "" },
  "url": "",
  "seriesIds": [],
  "createdAt": "2026-03-30T10:00:00.000Z",
  "updatedAt": "2026-03-30T10:00:00.000Z",
  "createdBy": 0,
  "updatedBy": 0,
  "creditLimit": "",
  "discount": "",
  "noMbReferences": false,
  "phoneNumberCountryId": 620,
  "mobileNumberCountryId": 620,
  "anonymous": false,
  "privateRecord": false,
  "concealmentReason": null,
  "thirdPartyCAEList": []
}
```
