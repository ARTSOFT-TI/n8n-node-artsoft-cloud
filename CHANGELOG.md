# Changelog

## 1.3.0

- Package renamed to `n8n-nodes-artsoft-cloud`; node internal name is now `artsoftCloud`.
- UI translated to English.
- Credential now uses n8n `authenticate` (`x-api-key`) and has a connection test.
- Built, linted and released with `@n8n/node-cli` (strict mode); publishing through GitHub Actions with npm provenance.
- Removed unused runtime dependencies (`fast-xml-parser`, `xmlbuilder2`).
