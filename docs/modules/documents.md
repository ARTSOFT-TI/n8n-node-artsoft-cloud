# Documentos (Documents)

Modulo de gestao de documentos de faturacao e compras na API ARTSOFT Cloud Invoice. Permite listar faturas/compras, consultar, criar cabecalhos, atualizar e apagar documentos.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar Faturas | GET | `/documents/billings` | Lista documentos de faturacao |
| Listar Faturas por Tipo SAFT | GET | `/documents/billings/{saftType}` | Lista faturas filtradas por tipo SAFT |
| Listar Compras | GET | `/documents/purchases` | Lista documentos de compra |
| Listar Compras por Tipo SAFT | GET | `/documents/purchases/{saftType}` | Lista compras filtradas por tipo SAFT |
| Consultar | GET | `/documents/{id}` | Obtem um documento pelo ID |
| Criar Cabecalho | POST | `/documents/header` | Cria um novo documento (apenas cabecalho) |
| Atualizar | POST | `/documents/{id}` | Atualiza um documento existente |
| Apagar | DELETE | `/documents/{id}` | Elimina um documento |

**Nota:** A atualizacao usa POST (nao PUT) para o endpoint `/documents/{id}`.

## Parametros de Listagem

| Campo | Tipo | Descricao |
|-------|------|-----------|
| saftType | string | Tipo SAFT (ex: FT, FR, ND, NC) -- obrigatorio para listagem por tipo |
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

## Campos para Criar Cabecalho

Os campos opcionais ficam na colecao **Additional Fields** (em branco por defeito). Na atualizacao, so sao alterados os campos que forem adicionados a colecao.

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| idSerie | number | Sim | ID da serie de configuracao do documento |
| idWarehouse | number | Sim | ID do armazem (default: 1) |

### Campos Adicionais (colecao opcional -- criacao)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| idThirdParty | number | 0 | ID do cliente ou fornecedor (ignorado se NIF preenchido) |
| fiscalNumber | string | '' | NIF -- usado quando o ID do terceiro nao esta disponivel |
| createThirdParty | boolean | false | Cria automaticamente o terceiro se o NIF nao existir |
| docDate | dateTime | data atual | Data do documento |

## Campos para Atualizar

### Campos Principais

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| documentId | string | Sim | ID do documento a atualizar |

### Campos Adicionais (colecao opcional -- atualizacao)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| sign | boolean | false | Assinar o documento apos atualizacao |
| comment | string | '' | Comentario / observacao |
| docReference | string | '' | Referencia do documento (financialInfo.docReference) |
| idPayCond | number | 0 | ID da condicao de pagamento (financialInfo.idPayCond) |
| idVatTypeExemption | number | 0 | ID do tipo de isencao de IVA |
| discountPercent | number | 0 | Percentagem de desconto global (total.discountPercent) |

### Info Financeira (colecao opcional)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| idSalesPerson | string | ID do vendedor |

### Terceiro - Morada (colecao opcional)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| address | string | Morada |
| postalCodeNumeric | string | Codigo postal |
| locality | string | Localidade |
| countryCode | string | Codigo do pais (default: 620) |
| countryRegionId | string | Regiao do pais (default: 25) |
| district | string | Distrito |
| county | string | Concelho |
| parish | string | Freguesia |

### Terceiro - Contacto (colecao opcional)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| phoneNumber | string | Telefone |
| phoneNumberCountryId | string | Pais do telefone (default: 620) |
| mobileNumber | string | Telemovel |
| mobileNumberCountryId | string | Pais do telemovel (default: 620) |
| email | string | Email |

### Local de Carga (colecao opcional)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| loadTypePlace | string | Tipo (default: DOCTERCLOC_PLACE) |
| address | string | Morada |
| postalCodeNumeric | string | Codigo postal |
| locality | string | Localidade |
| countryCode | string | Codigo do pais |
| countryRegionId | string | Regiao do pais |
| district | string | Distrito |
| county | string | Concelho |
| parish | string | Freguesia |
| dateTime | dateTime | Data/hora de carga |
| licensePlate | string | Matricula do veiculo |

### Local de Entrega (colecao opcional)

| Campo | Tipo | Descricao |
|-------|------|-----------|
| deliveryTypePlace | string | Tipo (default: DOCTERCLOC_DELIVERY) |
| address | string | Morada |
| postalCodeNumeric | string | Codigo postal |
| locality | string | Localidade |
| countryCode | string | Codigo do pais |
| countryRegionId | string | Regiao do pais |
| district | string | Distrito |
| county | string | Concelho |
| parish | string | Freguesia |
| dateTime | dateTime | Data/hora de entrega |

## Comportamento Especial

### Fluxo de Criacao de Documento Completo

A criacao de um documento completo envolve varios passos:

1. **Criar cabecalho** -- `POST /documents/header` -- devolve o ID do documento
2. **Adicionar linhas** -- `POST /documents/{id}/lines` (ver modulo document-lines)
3. **Atualizar documento** -- `POST /documents/{id}` -- com info financeira, comentarios, etc.
4. **Assinar** (opcional) -- `POST /documents/{id}?sign=true`

### Conversao de Data

A data do documento (`docDate`) e automaticamente convertida para o formato `YYYY-MM-DD` antes do envio a API. Se nao for preenchida, utiliza a data atual.

### Assinatura na Atualizacao

O parametro `sign` e enviado como query parameter (`?sign=true`), nao no corpo do pedido.

### Tipos SAFT Comuns

| Codigo | Descricao |
|--------|-----------|
| FT | Fatura |
| FR | Fatura-Recibo |
| ND | Nota de Debito |
| NC | Nota de Credito |

## Exemplo de Payload (Criar Cabecalho)

```json
{
  "idSerie": 1,
  "idWarehouse": 1,
  "fiscalNumber": "123456789",
  "docDate": "2026-03-30"
}
```

## Exemplo de Payload (Atualizar)

```json
{
  "comment": "Encomenda urgente",
  "idVatTypeExemption": 0,
  "total": {
    "discountPercent": 5.00
  },
  "financialInfo": {
    "docReference": "PO-2026-001",
    "idPayCond": 1,
    "idSalesPerson": "10"
  },
  "thirdParty": {
    "address": {
      "address": "Rua Nova, 100",
      "postalCodeNumeric": "1000-001",
      "locality": "Lisboa",
      "countryCode": "620",
      "countryRegionId": "25"
    },
    "contact": {
      "email": "cliente@exemplo.pt",
      "phoneNumber": "210000000",
      "phoneNumberCountryId": "620"
    }
  }
}
```
