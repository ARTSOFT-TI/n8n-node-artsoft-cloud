# 4. Clientes

Área: **Cloud — Customer**

| Operação | O que faz |
|----------|-----------|
| **List** | Lista clientes |
| **Get** | Devolve um cliente pelo ID |
| **Create** | Cria um cliente |
| **Update** | Altera um cliente existente |
| **Delete** | Apaga um cliente |

## 4.1 List — listar clientes

Campos de pesquisa e ordenação: ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho) (**Search**, **Filter**, **Page Size**, **Sort By**, **Direction**).

## 4.2 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Customer ID** | Sim | Número de identificação (ID) do cliente. |

## 4.3 Create — criar cliente

### Dados principais

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Number** | Sim | Número do cliente (sequencial). |
| **Name** | Sim | Nome completo. |
| **Short Name** | Sim | Nome abreviado. |
| **Tax ID** | Sim | NIF do cliente. |
| **Is Company** | Não | Ligue se o cliente for uma empresa (por omissão, desligado). |
| **Email** | Não | Email do cliente. |

### Morada

| Campo | Descrição |
|-------|-----------|
| **Address** | Rua e número. |
| **Locality** | Localidade. |
| **Postal Code** | Código postal, por exemplo `1000-001`. |
| **District** | Distrito — indique o **número (ID)** do distrito, não o nome. |
| **County** | Concelho — indique o **número (ID)**. |
| **Parish** | Freguesia — indique o **número (ID)**. |
| **Country Region** | Região do país — **número (ID)**. Por omissão `0`. |
| **Country Code** | Código do país. Por omissão `620` (Portugal). |

> Os números de distrito, concelho e freguesia são os códigos usados no ARTSOFT. Se não os tiver, pode deixar `0`.

### Dados de empresa

Só aparecem quando **Is Company** está ligado.

| Campo | Descrição |
|-------|-----------|
| **Trade Name** | Nome comercial. |
| **EORI** | Número EORI (operadores de comércio internacional). |

### Additional Fields (campos adicionais, opcionais)

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Anonymous** | Cliente anónimo. | Desligado |
| **Birth Date** | Data de nascimento (`AAAA-MM-DD`). | vazio |
| **Credit Limit** | Limite de crédito. | vazio |
| **Customer Status ID** | Número do estado do cliente. | `1` |
| **Discount** | Desconto habitual do cliente. | vazio |
| **Document Delivery Email** | Email para onde são enviados os documentos. | vazio |
| **Exempt VAT ID** | Número da isenção de IVA. | vazio |
| **Expedition Mode ID** | Número do modo de expedição. | vazio |
| **Inactive** | Marca o cliente como inativo. | Desligado |
| **Mobile Country** | País do telemóvel (código). | `620` |
| **No MB References** | Não gerar referências Multibanco para este cliente. | Desligado |
| **Notes** | Observações. | vazio |
| **Phone Country** | País do telefone (código). | `620` |
| **Private Record** | Registo privado. | Desligado |
| **Status** | **Active** (ativo) ou **Inactive** (inativo). | **Active** |
| **URL** | Página web do cliente. | vazio |

## 4.4 Update — alterar cliente

Preencha o **Customer ID** e os restantes campos, tal como em Create.

Como funciona:

- O node vai buscar os dados atuais do cliente e **só substitui os campos que preencher**. Os restantes ficam como estão.
- Os campos **Number**, **Name**, **Short Name** e **Tax ID** aparecem como obrigatórios no ecrã. Preencha-os com os valores atuais se não os quiser alterar.
- A caixa **Is Company** é **sempre** aplicada: confirme que reflete a situação real do cliente.
- Os campos de morada com valor `0` ou vazios não são alterados.
- Em **Additional Fields**, só são alterados os campos que adicionar.

## 4.5 Notas

- **Delete** apaga o cliente; se existirem documentos associados, o ARTSOFT pode recusar a operação e devolver uma mensagem de erro.
- Para procurar um cliente, use **List** com o nome (ou parte dele) no campo **Search**. A pesquisa por NIF depende do ARTSOFT; experimente num caso de teste.
