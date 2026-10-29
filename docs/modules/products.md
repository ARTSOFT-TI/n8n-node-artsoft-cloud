# Produtos (Products)

Modulo de gestao de produtos/artigos na API ARTSOFT Cloud Invoice. Permite listar, consultar, criar, atualizar e apagar produtos.

## Operacoes

| Operacao | Metodo HTTP | Endpoint | Descricao |
|----------|-------------|----------|-----------|
| Listar | GET | `/products/` | Lista todos os produtos com paginacao |
| Consultar | GET | `/products/{id}` | Obtem um produto pelo ID |
| Criar | POST | `/products/` | Cria um novo produto |
| Atualizar | PUT | `/products/{id}` | Atualiza um produto existente |
| Apagar | DELETE | `/products/{id}` | Elimina um produto |

## Parametros de Listagem

| Campo | Tipo | Descricao |
|-------|------|-----------|
| $search | string | Termo de pesquisa |
| $filter | string | Expressao de filtro |
| returnAll | boolean | Devolve todos os resultados (o node percorre as paginas internamente) |
| limit | number | Maximo de resultados a devolver (default: 50; so aparece se `returnAll` estiver desligado) |
| $sort | string | Campo de ordenacao |
| $direction | options | Direcao da ordenacao (asc/desc) |

## Campos para Criar / Atualizar

### Campos Principais (obrigatorios na criacao)

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| productSku | string | Sim | Codigo do produto (SKU) |
| productMainName | string | Sim | Nome principal do produto |
| productSaftClass | options | Sim | Classificacao SAF-T (ver valores abaixo) |
| productVatType | options | Sim | Tipo de IVA (ver valores abaixo) |
| productInventaryClass | options | Sim | Classe de inventario (ver valores abaixo) |
| productWarehouseId | number | Nao | ID do armazem (default: 1) |
| productUnitCodeId | number | Nao | ID da unidade de medida (default: 5 = Unidade) |
| productQuantityDecimalPlaces | number | Nao | Casas decimais na quantidade (default: 2) |

### Valores para Classe SAF-T (`productSaftClass`)

| Valor | Descricao |
|-------|-----------|
| SAFT_PROD | Produto (P) |
| SAFT_SERV | Servico (S) |
| SAFT_OTHER | Outros (O) |
| SAFT_TAX | Imposto/Taxa (I) |
| SAFT_EXCL | Excluido (E) |

### Valores para Tipo de IVA (`productVatType`)

| Valor | Descricao |
|-------|-----------|
| ISENTO | Isento |
| REDUZIDO | Reduzido |
| INTERMEDIO | Intermedio |
| NORMAL | Normal |

### Valores para Classe de Inventario (`productInventaryClass`)

| Valor | Descricao |
|-------|-----------|
| MERCADORIAS | Mercadorias |
| MATERIAS_PRIMAS | Materias-Primas |
| PRODUTOS_ACABADOS | Produtos Acabados |
| SUBPRODUTOS | Subprodutos |
| PRODUTOS_CURSO | Produtos em Curso |
| EMBALAGENS | Embalagens |

### Precos (colecao fixedCollection, multiplos valores)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| price | number | 0 | Valor do preco |
| number | number | 1 | Numero da tabela de precos (1, 2, 3...) |
| currencyId | number | 1 | ID da moeda |
| beginDate | dateTime | '' | Data de inicio |
| endDate | dateTime | '' | Data de fim |

### Codigos Opcionais (colecao fixedCollection, multiplos valores)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| supplierId | number | 1 | ID do fornecedor |
| quantity | number | 1 | Quantidade |
| code | string | '' | Codigo de barras ou codigo alternativo |
| optionalCodeId | number | 2 | ID do codigo opcional |

### Campos Adicionais (colecao opcional)

| Campo | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| exemptVatId | number | 0 | ID de isencao de IVA |
| obs | string | '' | Observacoes |
| ignoreHeaderDiscount | boolean | false | Ignorar desconto do cabecalho |
| ignoreLineDiscount | boolean | false | Ignorar desconto da linha |
| discontinued | boolean | false | Produto descontinuado |
| suspended | boolean | false | Produto suspenso |
| totalPrice | boolean | false | Preco total |

## Comportamento Especial

### Atualizacao (Update)

A operacao de atualizacao executa dois pedidos HTTP:

1. **GET** `/products/{id}` -- obtem o estado atual do produto
2. **PUT** `/products/{id}` -- envia o payload completo com as alteracoes aplicadas

Apenas os campos preenchidos pelo utilizador sobrescrevem os valores existentes.

### Merge de Precos na Atualizacao

Na atualizacao, os precos novos sao combinados (merge) com os precos existentes. A correspondencia e feita por `number` + `currencyId`. Se existir um preco com o mesmo numero de tabela e moeda, o registo existente e mantido (incluindo o `id` interno) e os campos sao atualizados. Isto evita a criacao de registos duplicados.

### Merge de Codigos Opcionais na Atualizacao

De forma identica aos precos, os codigos opcionais sao combinados por `supplierId` + `optionalCodeId`, preservando registos existentes.

### Conversao de Datas

As datas nos precos suportam multiplos formatos de entrada:
- ISO 8601 (ex: `2026-01-15T00:00:00.000Z`)
- `YYYY-MM-DD`
- `DD/MM/YYYY`

Todas sao convertidas para ISO 8601 antes do envio.

### Flags

Os campos `ignoreHeaderDiscount`, `ignoreLineDiscount`, `discontinued`, `suspended` e `totalPrice` sao agrupados num objeto `flags` no payload enviado a API.

## Exemplo de Payload (Criar)

```json
{
  "sku": "PROD001",
  "mainName": "Produto Exemplo",
  "saftClass": "SAFT_PROD",
  "vatType": "NORMAL",
  "inventaryClass": "MERCADORIAS",
  "status": "ACTIVE",
  "quantityDecimalPlaces": 2,
  "unitCodeId": 5,
  "warehouse": {
    "id": 1,
    "retired": false,
    "suspended": false,
    "status": "ACTIVE"
  },
  "flags": {
    "ignoreHeaderDiscount": false,
    "ignoreLineDiscount": false,
    "discontinued": false,
    "suspended": false,
    "totalPrice": false
  },
  "exemptVatId": null,
  "prices": [
    {
      "price": 29.99,
      "number": 1,
      "currencyId": 1,
      "beginDate": "2026-01-01T00:00:00.000Z",
      "endDate": "2026-12-31T00:00:00.000Z"
    }
  ],
  "optionalCodes": [
    {
      "supplierId": 1,
      "quantity": 1,
      "code": "5601234567890",
      "optionalCodeId": 2
    }
  ],
  "relatedSkus": [],
  "hierarchies": {},
  "obs": ""
}
```
