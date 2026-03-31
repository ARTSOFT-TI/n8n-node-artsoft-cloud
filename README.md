# n8n-nodes-artsoft — Guia de Inicio Rapido

Community node para [n8n](https://n8n.io) que integra com a API REST do **ARTSOFT Cloud** (ERP).
Permite automatizar operacoes de gestao (clientes, fornecedores, produtos, documentos, contas correntes) diretamente a partir de workflows n8n.

---

## Stack

- **TypeScript**
- **n8n-workflow** — Tipos e interfaces do n8n
- **Jest** — Testes de integracao

**Requisitos:**
- [Node.js >= 18](https://nodejs.org/)
- npm

---

## Instalacao de dependencias

```bash
npm install
```

---

## Build

```bash
npm run build
```

---

## Configuracao da Credential

O node utiliza a credential **ARTSOFT CLOUD API** com os seguintes campos:

| Campo | Descricao |
|-------|-----------|
| **NIF** | Numero de identificacao fiscal (usado na URL) |
| **Chave API** | Enviada no header `x-api-key` |
| **Development** | Alterna entre ambiente de producao e desenvolvimento |

### URLs geradas

| Ambiente | URL |
|----------|-----|
| Producao | `https://{nif}.artsoft.cloud/api` |
| Development | `http://{nif}.local.artsoft.cloud:3000/api` |

---

## Recursos disponiveis

| Recurso | Operacoes |
|---------|-----------|
| **Clientes** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Fornecedores** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Produtos** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Vendedores** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Documentos** | Listar Faturas, Listar Compras, Consultar, Criar Cabecalho, Atualizar, Apagar |
| **Linhas de Documento** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Conta Corrente** | Listar (Cliente/Fornecedor), Consultar, Criar Debito, Criar Credito, Atualizar, Apagar |

Para documentacao detalhada de cada modulo, consulta a pasta [`docs/modules/`](docs/modules/).

---

## Desenvolvimento local com n8n (Docker)

```bash
docker run -d \
    --name n8n \
    --restart unless-stopped \
    -p 5678:5678 \
    -v "$HOME/.n8n:/home/node/.n8n" \
    -v "/path/to/n8n-node-artsoft-cloud:/custom-nodes/n8n-node-artsoft-cloud" \
    -e N8N_CUSTOM_EXTENSIONS="/custom-nodes" \
    --add-host "SEUNIF.local.artsoft.cloud:SEU_IP_LOCAL" \
    docker.n8n.io/n8nio/n8n
```

> **Nota:** O `--add-host` e necessario porque `*.local.artsoft.cloud` resolve para `127.0.0.1`, que dentro do Docker e o proprio container. Substitui `SEUNIF` pelo NIF e `SEU_IP_LOCAL` pelo IP da maquina host na rede local.

---

## Ficheiro Hosts

Para o ambiente de **development**, adiciona ao ficheiro `hosts`:

```plaintext
# Cloud Local
127.0.0.1 login.local.artsoft.cloud
127.0.0.1 SEUNIF.local.artsoft.cloud
```

---

## Testes

Os testes de integracao chamam a API real de desenvolvimento.

### Configuracao

Cria um ficheiro `.env` na raiz do projeto:

```env
ARTSOFT_NIF=seu_nif
ARTSOFT_API_KEY=sua_api_key
```

### Executar

```bash
npm test
```

---

## Estrutura do projeto

```
├── credentials/              # Definicao da credential
├── nodes/
│   ├── ArtsoftCloud.node.ts  # Entry point do node
│   ├── nodes-description.ts  # UI (recursos, operacoes, campos)
│   └── resolver/
│       ├── index.ts          # ArtResolver — dispatch de operacoes
│       ├── handler.ts        # Registo de todas as operacoes
│       └── artsoft-cloud/
│           ├── GenericFunctions.ts  # HTTP client, URL builder, paginacao
│           ├── customers/
│           ├── suppliers/
│           ├── products/
│           ├── salespersons/
│           ├── documents/
│           ├── document-lines/
│           └── curr-account/
├── tests/                    # Testes de integracao
├── docs/                     # Documentacao
│   ├── overview.md
│   └── modules/              # Doc por modulo
├── package.json
└── tsconfig.json
```

---

## Scripts disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run build` | Compila TypeScript e copia assets |
| `npm run dev` | Compilacao em modo watch |
| `npm test` | Executa testes de integracao |
| `npm run lint` | Valida com ESLint |
| `npm run lintfix` | Corrige problemas de lint |
| `npm run pack` | Build + cria pacote npm |

---

## Acesso local

Apos arrancar o n8n via Docker:

- **n8n:** [http://localhost:5678](http://localhost:5678)
- **ARTSOFT Cloud (dev):** `http://SEUNIF.local.artsoft.cloud:3000/`
