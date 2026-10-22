# 11. Exemplos práticos

Os exemplos seguem o mesmo princípio: arrastar valores de um passo para o seguinte. Antes de começar, crie a [credencial](02-configuracao.md).

## Exemplo 1 — Ver os últimos clientes

1. Adicione o node **ARTSOFT**.
2. **Resource**: **Cloud — Customer**; **Operation**: **List**.
3. **Page Size**: `20`; **Sort By**: o nome do campo de data de criação (consulte o manual do ARTSOFT); **Direction**: **Descending**.
4. Clique em **Execute step**.

## Exemplo 2 — Criar um cliente a partir de um formulário

1. **Form Trigger** (ou outro gatilho) que recolhe nome, NIF e email.
2. Node **ARTSOFT** — **Cloud — Customer → Create**:
   - **Number**: o próximo número de cliente.
   - **Name**, **Short Name**, **Tax ID**, **Email**: arraste os valores do formulário.
3. Ative **Continue On Fail** se quiser que o fluxo prossiga quando o ARTSOFT recusar (por exemplo, NIF inválido).

## Exemplo 3 — Criar uma fatura com duas linhas

1. **ARTSOFT — Cloud — Document → Create Header**
   - **Series ID**: a série das faturas; **Warehouse ID**: `1`.
   - **Tax ID (VAT/NIF)**: NIF do cliente; ligue **Create Third Party Automatically** se o cliente puder ainda não existir.
2. **ARTSOFT — Cloud — Document Line → Create** (linha 1)
   - **Document ID**: arraste o ID do documento devolvido no passo 1.
   - **Product ID (SKU)**, **Quantity**, **Unit Price**.
3. **ARTSOFT — Cloud — Document Line → Create** (linha 2) — repita com outro produto.
4. **ARTSOFT — Cloud — Document → Update**
   - **Document ID**: o mesmo ID.
   - **Comment**, **Document Reference**, etc.
   - Ligue **Sign on Update** apenas se quiser assinar o documento neste momento.

> Dica: se tiver uma lista de artigos, coloque o passo das linhas a receber vários itens — o node cria uma linha por cada item recebido.

## Exemplo 4 — Listar faturas de um tipo

1. **Cloud — Document → List Invoices by SAFT Type**.
2. **SAFT Type**: `FT`. **Page Size**: `50`.

## Exemplo 5 — Registar um débito manual a um cliente

1. **Cloud — Current Account → Create Debit**.
2. **Series ID**, **Third Party ID** (ID do cliente), **Amount**.
3. Em **Entry VAT → Add VAT**, escolha **VAT Type** e **VAT Base**, se aplicável.
4. Opcional: **Comment**, **Document Reference**, **Additional Fields → Due Date**.

## Exemplo 6 — Atualizar o email de um cliente

1. **Cloud — Customer → Update**.
2. **Customer ID**: ID do cliente.
3. Preencha **Number**, **Name**, **Short Name**, **Tax ID** com os valores atuais (são obrigatórios no ecrã) e confirme **Is Company**.
4. **Email**: o novo email.

> Dica: use primeiro **Customer → Get** e arraste os valores atuais para estes campos.
