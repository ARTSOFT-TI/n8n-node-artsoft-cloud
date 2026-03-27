# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **n8n community node** for integrating with ARTSOFT (a business/ERP system) via XML-based HTTP communication. The full specification is in `n8n-nodes-artsoft-spec.md`.

The project is currently in **specification phase** — implementation files do not yet exist and must be created following the spec.

## Planned Project Structure

```
n8n-nodes-artsoft/
├── package.json              # name: "n8n-nodes-artsoft"
├── tsconfig.json
├── credentials/
│   └── Artsoft.credentials.ts
├── nodes/
│   └── Artsoft/
│       ├── Artsoft.node.ts
│       └── GenericFunctions.ts
└── helper/
    └── xml.ts
```

## Common Commands

Once package.json is created (standard n8n community node setup):

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run lint         # Run ESLint
npm run lintfix      # Auto-fix lint issues
```

For local development in n8n, link the package:
```bash
npm link
# In your n8n installation:
npm link n8n-nodes-artsoft
```

## Architecture

### Credentials (`credentials/Artsoft.credentials.ts`)
Configures `hostIp`, `port`, `protocol` (http|https), `username`, `password`. Authentication uses Basic Auth (`Authorization: Basic base64(username:password)`) isolated in a `getAuthHeaders()` helper in `GenericFunctions.ts` to allow future changes.

### Transport
All requests use `Content-Type: application/xml; charset=utf-8` and `Accept: application/xml`. XML is sent as a string body; responses are parsed from XML to JSON.

### Three Operations (`nodes/Artsoft/Artsoft.node.ts`)

1. **Create Client** — sends XML to `TerUpdate` endpoint (XML spec pending)
2. **Create Item (SKU)** — sends XML to `SkuUpdate` endpoint (XML spec pending)
3. **Create Document** — two modes:
   - **Summary**: `<document docSer="..." entityID="..." ...>`
   - **Full**: `<message ...><entities/><SKUs/><salesPersons/><documents/></message>`

### XML Handling (`helper/xml.ts`)
Uses `fast-xml-parser` for parsing responses and `xmlbuilder2` for building request XML.

### Response Parsing
Responses expose: `success`, `id`, `palete`, `err`, `parsed`, `rawXml` (if debug enabled).
Errors throw `NodeApiError` with structured data.

## Key Dependencies

- `fast-xml-parser` — XML response parsing
- `xmlbuilder2` — XML request building
- `n8n-workflow` — n8n node types and interfaces

## Outstanding TODOs (from spec)

- Confirm real ARTSOFT endpoints
- Obtain official XML specification for `TerUpdate` and `SkuUpdate`
- Confirm final authentication method
