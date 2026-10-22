# 5. Fornecedores

Área: **Cloud — Supplier**

| Operação | O que faz |
|----------|-----------|
| **List** | Lista fornecedores |
| **Get** | Devolve um fornecedor pelo ID |
| **Create** | Cria um fornecedor |
| **Update** | Altera um fornecedor existente |
| **Delete** | Apaga um fornecedor |

## 5.1 List — listar fornecedores

Campos: **Search**, **Filter**, **Page Size**, **Sort By**, **Direction** — ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho).

## 5.2 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Supplier ID** | Sim | Número de identificação (ID) do fornecedor. |

## 5.3 Create — criar fornecedor

### Dados principais

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Number** | Sim | Número do fornecedor (sequencial). |
| **Name** | Sim | Nome completo. |
| **Short Name** | Sim | Nome abreviado. |
| **Tax ID** | Sim | NIF do fornecedor. |
| **Is Company** | Não | Ligue se for uma empresa (por omissão, desligado). |

### Morada

| Campo | Descrição |
|-------|-----------|
| **Address** | Rua e número. |
| **Locality** | Localidade. |
| **Postal Code** | Código postal, por exemplo `1000-001`. |
| **District** | **Número (ID)** do distrito. |
| **County** | **Número (ID)** do concelho. |
| **Parish** | **Número (ID)** da freguesia. |
| **Country Region** | **Número (ID)** da região do país. Por omissão `0`. |
| **Country Code** | Código do país. Por omissão `620` (Portugal). |

### Dados de empresa

Só aparecem quando **Is Company** está ligado.

| Campo | Descrição |
|-------|-----------|
| **Trade Name** | Nome comercial. |
| **EORI** | Número EORI. |

### Additional Fields (opcionais)

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Anonymous** | Fornecedor anónimo. | Desligado |
| **Birth Date** | Data de nascimento (`AAAA-MM-DD`). | vazio |
| **IBAN** | IBAN do fornecedor. | vazio |
| **Inactive** | Marca como inativo. | Desligado |
| **Mobile Country** | País do telemóvel (código). | `620` |
| **Notes** | Observações. | vazio |
| **Phone Country** | País do telefone (código). | `620` |
| **Price Table ID** | Número da tabela de preços. | `0` |
| **Private Record** | Registo privado. | Desligado |
| **Status** | **Active** ou **Inactive**. | **Active** |
| **Supplier Status ID** | Número do estado do fornecedor. | `1` |
| **SWIFT** | Código SWIFT/BIC. | vazio |
| **URL** | Página web. | vazio |

## 5.4 Update — alterar fornecedor

- Preencha o **Supplier ID**.
- O node vai buscar os dados atuais e **só substitui os campos que preencher**.
- **Number**, **Name**, **Short Name** e **Tax ID** aparecem como obrigatórios: preencha-os com os valores atuais se não os quiser alterar.
- A caixa **Is Company** é sempre aplicada: confirme o valor.
- Em **Additional Fields**, só são alterados os campos que adicionar.
