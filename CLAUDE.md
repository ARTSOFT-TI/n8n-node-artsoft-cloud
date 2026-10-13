# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

n8n community node (`n8n-nodes-artsoft-cloud`) for the **ARTSOFT Cloud Invoice** REST API (JSON over HTTP). It is built and linted with the official `@n8n/node-cli` in **strict mode** so it can be verified for n8n Cloud. User-facing docs are in `README.md` and `docs/`.

## Commands

```bash
npm install
npm run build      # n8n-node build
npm run lint       # n8n-node lint (strict: n8n Cloud rules)
npm run lint:fix
npm run dev        # n8n-node dev (local n8n with hot reload)
npm test           # Jest integration tests — need a live API (.env: ARTSOFT_NIF, ARTSOFT_API_KEY)
npm run release    # n8n-node release (CI publishes with npm provenance on tag push)
```

## Architecture

- `credentials/ArtsoftCloudApi.credentials.ts` — `artsoftCloudApi`: `nif`, `apiKey`, `development`. Auth via `authenticate` (`x-api-key` header); the credential `test` calls `GET /customers/?$size=1` (assumption, confirm against the API docs). Base URL: `https://{nif}.artsoft.cloud/api` (production), `https://{nif}.local.artsoft.cloud:3000/api` (development).
- `nodes/ArtsoftCloud/ArtsoftCloud.node.ts` — node class (`name: artsoftCloud`): UI description + `execute`.
- `nodes/ArtsoftCloud/resolver/` — `ArtResolver` dispatches an operation to the per-resource handlers in `artsoft-cloud/{customers,suppliers,products,salespersons,documents,document-lines,curr-account}`.
- `nodes/ArtsoftCloud/resolver/artsoft-cloud/GenericFunctions.ts` — `cloudApiRequest` (uses `httpRequestWithAuthentication`), URL builder and pagination params.
- `tests/` — integration tests against the API; excluded from lint via `/* eslint-disable */` and not published (`files: ["dist"]`).

## Constraints (n8n verification)

- No runtime `dependencies`; only `n8n-workflow` as peer dependency.
- Do not edit `eslint.config.mjs` (the CLI checks that it is the default config in strict mode).
- Publishing is done only by `.github/workflows/publish.yml` (npm provenance); never `npm publish` locally.
