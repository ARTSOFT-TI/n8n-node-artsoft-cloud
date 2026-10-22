# 10. Conta corrente

Área: **Cloud — Current Account**

Permite consultar os movimentos das contas correntes de clientes e fornecedores, e criar débitos, créditos e regularizações.

| Operação | O que faz |
|----------|-----------|
| **List Customers** | Lista as contas correntes de clientes |
| **List Suppliers** | Lista as contas correntes de fornecedores |
| **Get** | Devolve um lançamento pelo ID |
| **Create Debit** | Cria um débito manual |
| **Create Credit** | Cria um crédito (regularização) |
| **Update** | Altera um lançamento |
| **Delete** | Apaga um lançamento |

## 10.1 Listar

Campos: **Search**, **Filter**, **Page Size**, **Sort By**, **Direction** — ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho).

## 10.2 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Current Account ID** | Sim | Número de identificação (ID) do lançamento. |

## 10.3 Create Debit e Create Credit

Os dois partilham os campos abaixo.

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Series ID** | Sim | Número da série. |
| **Third Party ID** | Sim | Número do cliente ou fornecedor. |
| **Tax ID** | Não | NIF do cliente/fornecedor. |
| **Amount** | Sim | Valor do lançamento. |
| **Balance** | Não | Saldo total. |
| **Document Date** | Não | Data do documento. Se vazio, usa a data de hoje. |
| **Comment** | Não | Observações. |
| **Document Reference** | Não | Referência do documento. |

**Additional Fields** (opcionais):

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Due Date** | Data de vencimento. | vazio |
| **Payment Date** | Data de pagamento. | vazio |
| **Total Manual Mode** | Calcular o total em modo manual. | Desligado |

### Só em Create Debit — Entry VAT (IVA do lançamento)

Clique em **Add VAT** para indicar o IVA.

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **VAT Type** | **Exempt** (isento), **Intermediate** (intermédia), **Normal** ou **Reduced** (reduzida). | **Normal** |
| **VAT Base** | Valor base sobre o qual incide o IVA. | `0` |
| **VAT Exemption ID** | Número do motivo de isenção (apenas se o tipo for **Exempt**). | `0` |

### Só em Create Credit — Items to Regularize (itens a regularizar)

Clique em **Add Item** por cada lançamento a regularizar.

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **ID** | Número do lançamento a regularizar. | `0` |
| **Value to Regularize** | Valor a regularizar. | `0` |
| **Original Value** | Valor original do lançamento. | `0` |
| **Balance** | Saldo do lançamento. | `0` |
| **Type** | Tipo de lançamento. | `CREDITOS_CLI` |
| **Series** | Série do documento, por exemplo `B0022/22`. | vazio |
| **Date** | Data. | vazio |
| **Due Date** | Data de vencimento. | vazio |
| **Billing Document ID** | Número do documento de faturação. | `0` |
| **Is Regularized By** | Já regularizado por outro lançamento. | Desligado |
| **Has Taxes** | O lançamento tem impostos. | Desligado |

## 10.4 Update — alterar lançamento

Só são enviados os campos preenchidos (valores vazios ou `0` são ignorados).

| Campo | Descrição |
|-------|-----------|
| **Current Account ID** (obrigatório) | ID do lançamento a alterar. |
| **Comment** | Observações. |
| **Document Reference** | Referência do documento. |
| **Amount** | Valor do lançamento. |
| **Balance** | Saldo total. |
| **Entry VAT** | IVA do lançamento (mesmos campos que em Create Debit). |

**Additional Fields (Update)**

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Document Date** | Data do documento. | vazio |
| **Due Date** | Data de vencimento. | vazio |
| **Payment Date** | Data de pagamento. | vazio |
| **Invoice Number** | Número da fatura. | vazio |
| **Series ID** | Número da série. | `0` |
| **Third Party ID** | Número do cliente/fornecedor. | `0` |
| **Third Party Name** | Nome do cliente/fornecedor. | vazio |
| **Salesperson ID** | Número do vendedor. | `0` |
| **Salesperson Name** | Nome do vendedor. | vazio |
| **Salesperson Tax ID** | NIF do vendedor. | vazio |
| **State** | **Draft** (rascunho) ou **Finalized** (finalizado). | **Finalized** |
| **Signed** | Lançamento assinado. | Desligado |
| **Total Manual Mode** | Calcular o total em modo manual. | Desligado |

**Items to Regularize (Update)** — os mesmos campos do Create Credit, com dois extra:

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Editable** | O item pode ser editado. | Ligado |
| **Billing Document Invoice Number** | Número da fatura do documento de faturação. | vazio |

## 10.5 Notas

- As datas podem ser escritas como `AAAA-MM-DD` ou `DD/MM/AAAA`; o node converte-as.
- Um débito/crédito altera o saldo do cliente/fornecedor. Teste primeiro num registo de teste.
