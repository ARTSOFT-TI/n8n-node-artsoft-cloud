# Fornecedores (Suppliers)

Modulo de gestao de fornecedores na API ARTSOFT Cloud Invoice. Permite listar, consultar, criar, atualizar e apagar fornecedores.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar | GET | `/suppliers/` | Lista todos os fornecedores com paginacao |
| Consultar | GET | `/suppliers/{id}` | Obtem um fornecedor pelo ID |
| Criar | POST | `/suppliers/` | Cria um novo fornecedor |
| Atualizar | PUT | `/suppliers/{id}` | Atualiza um fornecedor existente |
| Apagar | DELETE | `/suppliers/{id}` | Elimina um fornecedor |

## Parametros de Listagem

| Campo | Tipo | Descricao |
|-------|------|-----------|
| $search | string | Termo de pesquisa |
| $filter | string | Expressao de filtro |
| $size | number | Numero de resultados por pagina (default: 10) |
| $sort | string | Campo de ordenacao |
| $direction | options | Direcao da ordenacao (asc/desc) |

## Campos para Criar / Atualizar

### Campos Principais (obrigatorios na criacao)

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| supplierNumber | number | Sim | Numero sequencial do fornecedor |
| supplierName | string | Sim | Nome completo do fornecedor |
| supplierShortName | string | Sim | Abreviatura do nome |
| supplierFiscalNumber | string | Sim | NIF - Numero de identificacao fiscal |
| supplierIsCompany | boolean | Nao | Indica se o fornecedor e uma empresa (default: false) |

### Morada

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| supplierAddress | string | Nao | Endereco do fornecedor |
| supplierLocality | string | Nao | Localidade |
| supplierPostalCode | string | Nao | Codigo postal (ex: 1000-001) |
| supplierDistrict | number | Nao | ID do distrito |
| supplierCounty | number | Nao | ID do concelho |
| supplierParish | number | Nao | ID da freguesia |
| supplierCountryRegionId | number | Nao | ID da regiao do pais (default: 0) |
| supplierCountryCode | number | Nao | Codigo do pais (default: 620 = Portugal) |

### Empresa (visiveis apenas quando supplierIsCompany = true)

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| supplierTradeName | string | Nao | Nome comercial da empresa |
| supplierEori | string | Nao | Numero EORI |

### Campos Adicionais (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| birthDate | string | '' | Data de nascimento (ISO 8601) |
| status | options | ACTIVE | Estado (ACTIVE / INACTIVE) |
| inactive | boolean | false | Marca como inativo |
| supplierStatusId | number | 1 | ID do estado do fornecedor |
| url | string | '' | URL |
| swift | string | '' | Codigo SWIFT |
| iban | string | '' | Numero IBAN |
| priceId | number | 0 | ID da tabela de precos |
| observation1 | string | '' | Observacoes |
| anonymous | boolean | false | Fornecedor anonimo |
| privateRecord | boolean | false | Registo privado |
| phoneNumberCountryId | number | 620 | Codigo do pais do telefone |
| mobileNumberCountryId | number | 620 | Codigo do pais do telemovel |

## Comportamento Especial

### Atualizacao (Update)

A operacao de atualizacao executa dois pedidos HTTP:

1. **GET** `/suppliers/{id}` -- obtem o estado atual do fornecedor
2. **PUT** `/suppliers/{id}` -- envia o payload completo com as alteracoes aplicadas

Apenas os campos preenchidos pelo utilizador sobrescrevem os valores existentes. Campos vazios ou com valor 0/false sao ignorados na atualizacao, preservando os dados originais.

### Payload automatico

Na criacao, os seguintes campos sao preenchidos automaticamente:
- `mainAddress` inclui campos adicionais: `addressNumber: 0`, `latitude: 0`, `longitude: 0`, `addressSubunit: ''`, `postalCodeAlpha: ''`, `localId: 0`, `hasCurrentAccount: false`, `validUntil` (data atual)
- `concealmentReason` -- null
- Arrays vazios: `addresses`, `staffs`, `seriesIds`, `thirdPartyCAEList`
- Objeto vazio: `hierarchies`

## Exemplo de Payload (Criar)

```json
{
  "number": 500,
  "name": "Fornecedor ABC Lda",
  "shortName": "ABC",
  "birthDate": "",
  "status": "ACTIVE",
  "inactive": false,
  "isCompany": true,
  "mainAddress": {
    "name": "Rua Industrial, 50",
    "status": "ACTIVE",
    "parish": 0,
    "county": 0,
    "district": 0,
    "postalCodeNumeric": "4000-100",
    "countryCode": 620,
    "countryRegionId": 0,
    "address": "Rua Industrial, 50",
    "locality": "Porto",
    "addressNumber": 0,
    "latitude": 0,
    "longitude": 0,
    "addressSubunit": "",
    "postalCodeAlpha": "",
    "localId": 0,
    "hasCurrentAccount": false,
    "validUntil": "2026-03-30T10:00:00.000Z"
  },
  "taxPayer": {
    "fiscalNumber": "987654321",
    "countryCode": 620,
    "status": 0,
    "valid": true
  },
  "companyDetails": {
    "eori": "",
    "tradeName": "ABC Comercio"
  },
  "supplierStatusId": 1,
  "addresses": [],
  "staffs": [],
  "observations": { "observation1": "" },
  "url": "",
  "swift": "",
  "iban": "",
  "priceId": null,
  "seriesIds": [],
  "hierarchies": {},
  "phoneNumberCountryId": 620,
  "mobileNumberCountryId": 620,
  "anonymous": false,
  "privateRecord": false,
  "concealmentReason": null,
  "thirdPartyCAEList": []
}
```
