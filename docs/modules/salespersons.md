# Vendedores (Salespersons)

Modulo de gestao de vendedores na API ARTSOFT Cloud Invoice. Permite listar, consultar, criar, atualizar e apagar vendedores.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar | GET | `/salespersons/` | Lista todos os vendedores com paginacao |
| Consultar | GET | `/salespersons/{id}` | Obtem um vendedor pelo ID |
| Criar | POST | `/salespersons/` | Cria um novo vendedor |
| Atualizar | PUT | `/salespersons/{id}` | Atualiza um vendedor existente |
| Apagar | DELETE | `/salespersons/{id}` | Elimina um vendedor |

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
| salespersonNumber | number | Sim | Numero sequencial do vendedor |
| salespersonName | string | Sim | Nome completo do vendedor |
| salespersonShortName | string | Sim | Abreviatura do nome |
| salespersonFiscalNumber | string | Sim | NIF - Numero de identificacao fiscal |
| salespersonEmail | string | Nao | Email do vendedor |

### Morada

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| salespersonAddress | string | Nao | Endereco do vendedor |
| salespersonLocality | string | Nao | Localidade |
| salespersonPostalCode | string | Nao | Codigo postal (ex: 1000-001) |
| salespersonDistrict | number | Nao | ID do distrito |
| salespersonCounty | number | Nao | ID do concelho |
| salespersonParish | number | Nao | ID da freguesia |
| salespersonCountryRegionId | number | Nao | ID da regiao do pais (default: 25) |
| salespersonCountryCode | number | Nao | Codigo do pais (default: 620 = Portugal) |

### Campos Adicionais (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| birthDate | string | '' | Data de nascimento (ISO 8601) |
| status | options | ACTIVE | Estado (ACTIVE / INACTIVE) |
| inactive | boolean | false | Marca como inativo |
| observation1 | string | '' | Observacoes |
| anonymous | boolean | false | Vendedor anonimo |
| privateRecord | boolean | false | Registo privado |
| phoneNumberCountryId | number | 620 | Codigo do pais do telefone |
| mobileNumberCountryId | number | 620 | Codigo do pais do telemovel |

## Comportamento Especial

### Atualizacao (Update)

A operacao de atualizacao executa dois pedidos HTTP:

1. **GET** `/salespersons/{id}` -- obtem o estado atual do vendedor
2. **PUT** `/salespersons/{id}` -- envia o payload completo com as alteracoes aplicadas

Apenas os campos preenchidos pelo utilizador sobrescrevem os valores existentes.

### Conversao de countryCode e countryRegionId

Na criacao, os campos `countryCode` e `countryRegionId` sao convertidos para string no payload de nivel raiz (fora de `mainAddress`), mas mantidos como number dentro do objeto `mainAddress` e `taxPayer`.

### Default diferente para countryRegionId

Ao contrario dos modulos de clientes e fornecedores (onde o default e 0), o modulo de vendedores usa **25** como default para `countryRegionId`.

## Exemplo de Payload (Criar)

```json
{
  "number": 10,
  "name": "Joao Silva",
  "shortName": "J. Silva",
  "email": "joao.silva@exemplo.pt",
  "birthDate": "",
  "status": "ACTIVE",
  "inactive": false,
  "countryCode": "620",
  "countryRegionId": "25",
  "taxPayer": {
    "fiscalNumber": "123456789",
    "countryCode": 620,
    "status": 0,
    "valid": true
  },
  "mainAddress": {
    "name": "Rua do Comercio, 10",
    "status": "ACTIVE",
    "address": "Rua do Comercio, 10",
    "postalCodeNumeric": "1100-200",
    "locality": "Lisboa",
    "countryCode": 620,
    "countryRegionId": 25,
    "parish": 0,
    "county": 0,
    "district": 0,
    "addressNumber": 0,
    "hasCurrentAccount": false,
    "latitude": 0,
    "longitude": 0,
    "validUntil": "2026-03-30T10:00:00.000Z",
    "addressSubunit": "",
    "postalCodeAlpha": "",
    "localId": 0
  },
  "observations": { "observation1": "" },
  "phoneNumberCountryId": 620,
  "mobileNumberCountryId": 620,
  "anonymous": false,
  "privateRecord": false,
  "concealmentReason": null
}
```
