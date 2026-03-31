# n8n-nodes-artsoft — Overview

## O que é

Community node para [n8n](https://n8n.io) que integra com a API REST do **ARTSOFT Cloud** (ERP). Permite automatizar operações de gestão (clientes, fornecedores, produtos, documentos, contas correntes) diretamente a partir de workflows n8n.

## Recursos disponíveis

| Recurso | Operações |
|---------|-----------|
| **Clientes** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Fornecedores** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Produtos** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Vendedores** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Documentos** | Listar Faturas, Listar Compras, Consultar, Criar Cabeçalho, Atualizar, Apagar |
| **Linhas de Documento** | Listar, Consultar, Criar, Atualizar, Apagar |
| **Conta Corrente** | Listar (Cliente/Fornecedor), Consultar, Criar Débito, Criar Crédito, Atualizar, Apagar |

## Autenticação

Utiliza a credential **ARTSOFT CLOUD API** com:

- **NIF** — Número de identificação fiscal (usado para construir a URL base)
- **Chave API** — Enviada no header `x-api-key`
- **Development** — Checkbox que alterna entre ambiente de produção e desenvolvimento

### URLs

| Ambiente | URL |
|----------|-----|
| Produção | `https://{nif}.artsoft.cloud/api` |
| Development | `http://{nif}.local.artsoft.cloud:3000/api` |

## Stack

- **TypeScript** — Linguagem principal
- **n8n-workflow** — Tipos e interfaces do n8n
- **Jest** — Testes de integração

## Estrutura do projeto

```
├── credentials/              # Definição da credential
├── nodes/
│   ├── ArtsoftCloud.node.ts  # Entry point do node
│   ├── nodes-description.ts  # UI do node (recursos, operações, campos)
│   └── resolver/
│       ├── index.ts          # ArtResolver — dispatch de operações
│       ├── handler.ts        # Registo de todas as operações
│       └── artsoft-cloud/
│           ├── GenericFunctions.ts  # HTTP client, URL builder, paginação
│           ├── customers/           # CRUD clientes
│           ├── suppliers/           # CRUD fornecedores
│           ├── products/            # CRUD produtos
│           ├── salespersons/        # CRUD vendedores
│           ├── documents/           # Documentos (faturas, compras)
│           ├── document-lines/      # Linhas de documento
│           └── curr-account/        # Conta corrente
├── tests/                    # Testes de integração
├── package.json
└── tsconfig.json
```

## Como usar

### Instalação

```bash
npm install
npm run build
```

### Desenvolvimento local com n8n (Docker)

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

### Testes

```bash
npm test
```

Os testes de integração chamam a API real de desenvolvimento. Requerem um ficheiro `.env` com:

```
ARTSOFT_NIF=seu_nif
ARTSOFT_API_KEY=sua_api_key
```
