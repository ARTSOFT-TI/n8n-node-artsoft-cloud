# n8n-nodes-artsoft-cloud

[n8n](https://n8n.io) community node for **ARTSOFT Cloud Invoice** (by ARTSOFT Business Software). It lets workflows list, read, create, update and delete customers, suppliers, products, salespersons, documents, document lines and current account entries through the ARTSOFT Cloud Invoice REST API.

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Credentials](#credentials)
- [Operations](#operations)
- [Example workflow](#example-workflow)
- [Response format](#response-format)
- [Compatibility and limitations](#compatibility-and-limitations)
- [Resources](#resources)
- [Version history](#version-history)

## Installation

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) and install the package `n8n-nodes-artsoft-cloud`.

For a self-hosted instance you can also install it from the command line in your n8n user folder:

```bash
npm install n8n-nodes-artsoft-cloud
```

## Prerequisites

- An ARTSOFT Cloud Invoice subscription. Your tax ID (NIF) identifies your instance (`https://{nif}.artsoft.cloud`).
- An ARTSOFT Cloud Invoice API key.

## Credentials

Create an **ARTSOFT Cloud Invoice API** credential with:

| Field | Description |
|---|---|
| NIF | Tax ID of your ARTSOFT Cloud Invoice instance, used to build the URL, e.g. `123456789` |
| API Key | API key, sent in the `x-api-key` header |
| Development | Use the development environment instead of production. Leave off unless you work against a local ARTSOFT Cloud Invoice |

Generated base URLs:

| Environment | URL |
|---|---|
| Production | `https://{nif}.artsoft.cloud/api` |
| Development | `https://{nif}.local.artsoft.cloud:3000/api` (local use only; TLS certificate validation is skipped in this mode, so local CAs such as mkcert work without extra setup) |

The credential test calls `GET /customers/?$size=1`, so it also requires read access to customers.

## Operations

| Resource | Operations |
|---|---|
| **Customer** | List, Get, Create, Update, Delete |
| **Supplier** | List, Get, Create, Update, Delete |
| **Product** | List, Get, Create, Update, Delete |
| **Salesperson** | List, Get, Create, Update, Delete |
| **Document** | List Invoices, List Invoices by SAFT Type, List Purchases, List Purchases by SAFT Type, Get, Create Header, Update, Delete |
| **Document Line** | List, Get, Create, Update, Delete |
| **Current Account** | List Customers, List Suppliers, Get, Create Debit, Create Credit, Update, Delete |

*List* operations expose **Return All**, **Limit** and a **Filters** collection (`search`, `filter`, `sort`, `direction`). The node walks the API pages internally and returns one item per record.

On *Create* and *Update* operations only the required fields are shown by default; every optional field lives in the **Additional Fields** collection. On *Update*, only the fields you add to that collection are changed.

### Migrating from 2.x

Workflows built with 2.x need to be reviewed, because parameters that moved are **not migrated automatically** (n8n ignores values that no longer exist, without an error):

| Change | What to do |
|---|---|
| *List* operations return one item per record instead of one item holding `{ "value": [...] }` | Replace expressions such as `{{ $json.value[0] }}` with `{{ $json.name }}` |
| **Page Size** (`$size`) was replaced by **Return All** / **Limit** | Set **Limit**, or turn on **Return All** |
| `$search`, `$filter`, `$sort` and `$direction` moved into **Filters** | Add them again under **Filters** |
| Optional fields on *Create* / *Update* (e.g. Email, Address, Postal Code, Country Code, Trade Name, EORI, Is Company, Tax/Inventory class, Sign, Comment) moved into **Additional Fields** | Add them again under **Additional Fields** |
| *Document Line → List*: **Page**, **Page Size** and **Filter** were removed (the API ignored them) | Use **Return All** / **Limit** |

Detailed field reference per module (currently in Portuguese): [`docs/modules/`](docs/modules/).

## Example workflow

Create a customer and then a document header for it:

1. **ARTSOFT** node: *Customer → Create*, with the customer data. The response contains the new customer.
2. **ARTSOFT** node: *Document → Create Header*, using an expression to pass the customer ID from step 1.
3. **ARTSOFT** node: *Document Line → Create*, to add lines to the document.

Enable **Continue On Fail** on any step if you want the workflow to keep going when the API rejects an item.

## Response format

The node returns the JSON answer of the ARTSOFT Cloud Invoice API as the item `json`. It sends one request per input item.

When the API answers with an error, the item fails with a `NodeApiError` that includes the API error code and message (or it is returned as an error item when *Continue On Fail* is on).

## Compatibility and limitations

- Requires an n8n version that supports community nodes with `n8nNodesApiVersion` 1.
- The node is usable as an AI agent tool (`usableAsTool`).
- The UI labels are in English. Some field descriptions mirror ARTSOFT terminology (for example *Third Party*, *SAFT*, *MB References*).
- Parameter names and option values are kept stable between versions, so saved workflows keep working. Labels may change.

## Resources

- [Source code and issues](https://github.com/ARTSOFT-TI/n8n-node-artsoft-cloud)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ARTSOFT Cloud Invoice manual](https://artsoft-cloud.eniston.com/)

## Version history

See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)
