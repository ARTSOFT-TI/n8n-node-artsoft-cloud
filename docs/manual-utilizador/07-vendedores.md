# 7. Vendedores

Área: **Cloud — Salesperson**

| Operação | O que faz |
|----------|-----------|
| **List** | Lista vendedores |
| **Get** | Devolve um vendedor pelo ID |
| **Create** | Cria um vendedor |
| **Update** | Altera um vendedor existente |
| **Delete** | Apaga um vendedor |

## 7.1 List — listar vendedores

Campos: **Search**, **Filter**, **Page Size**, **Sort By**, **Direction** — ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho).

## 7.2 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Salesperson ID** | Sim | Número de identificação (ID) do vendedor. |

## 7.3 Create — criar vendedor

### Dados principais

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Number** | Sim | Número do vendedor (sequencial). |
| **Name** | Sim | Nome completo. |
| **Short Name** | Sim | Nome abreviado. |
| **Tax ID (VAT/NIF)** | Sim | NIF do vendedor. |
| **Email** | Não | Email do vendedor. |

### Morada

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Address** | Rua e número. | vazio |
| **Locality** | Localidade. | vazio |
| **Postal Code** | Código postal, por exemplo `1000-001`. | vazio |
| **District** | **Número (ID)** do distrito. | `0` |
| **County** | **Número (ID)** do concelho. | `0` |
| **Parish** | **Número (ID)** da freguesia. | `0` |
| **Country Region** | **Número (ID)** da região do país. | `25` |
| **Country Code** | Código do país (`620` = Portugal). | `620` |

### Additional Fields (opcionais)

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Anonymous** | Registo anónimo. | Desligado |
| **Birth Date** | Data de nascimento (`AAAA-MM-DD`). | vazio |
| **Inactive** | Vendedor inativo. | Desligado |
| **Mobile Phone Country** | País do telemóvel (código). | `620` |
| **Notes** | Observações. | vazio |
| **Phone Country** | País do telefone (código). | `620` |
| **Private Record** | Registo privado. | Desligado |
| **Status** | **Active** ou **Inactive**. | **Active** |

## 7.4 Update — alterar vendedor

- Preencha o **Salesperson ID**.
- O node vai buscar os dados atuais e **só substitui o que preencher**.
- **Number**, **Name**, **Short Name** e **Tax ID (VAT/NIF)** aparecem como obrigatórios: preencha-os com os valores atuais se não os quiser alterar.
- Em **Additional Fields**, só são alterados os campos que adicionar.
