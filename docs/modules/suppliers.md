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
| supplierNumber | number | Sim | Numero sequencial do fornecedor |
| supplierName | string | Sim | Nome completo do fornecedor |
| supplierShortName | string | Sim | Abreviatura do nome |
| supplierFiscalNumber | string | Sim | NIF - Numero de identificacao fiscal |

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
| isCompany | boolean | false | Indica se o fornecedor e uma empresa |
| address | string | '' | Endereco do fornecedor |
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
