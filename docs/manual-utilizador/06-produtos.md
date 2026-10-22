# 6. Produtos

Área: **Cloud — Product**

| Operação | O que faz |
|----------|-----------|
| **List** | Lista produtos |
| **Get** | Devolve um produto pelo ID |
| **Create** | Cria um produto |
| **Update** | Altera um produto existente |
| **Delete** | Apaga um produto |

## 6.1 List — listar produtos

Campos: **Search**, **Filter**, **Page Size**, **Sort By**, **Direction** — ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho).

## 6.2 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Product ID** | Sim | Número de identificação (ID) do produto. |

## 6.3 Create — criar produto

### Dados principais

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **SKU** | Sim | Código do produto. |
| **Name** | Sim | Nome principal do produto. |
| **SAF-T Class** | Não | Classificação fiscal (SAF-T). Ver tabela abaixo. Por omissão **Product (P)**. |
| **VAT Type** | Não | Taxa de IVA. Ver tabela abaixo. Por omissão **Normal**. |
| **Inventory Class** | Não | Classe de inventário. Ver tabela abaixo. Por omissão **Merchandise**. |
| **Warehouse ID** | Não | Número do armazém. Por omissão `1`. |
| **Unit of Measure ID** | Não | Número da unidade de medida. Por omissão `5`. |
| **Quantity Decimal Places** | Não | Casas decimais permitidas nas quantidades. Por omissão `2`. |

**SAF-T Class**

| Opção no ecrã | Significado |
|---------------|-------------|
| **Excluded (E)** | Excluído |
| **Other (O)** | Outro |
| **Product (P)** | Produto |
| **Service (S)** | Serviço |
| **Tax/Fee (I)** | Imposto/taxa |

**VAT Type**

| Opção no ecrã | Significado |
|---------------|-------------|
| **Exempt** | Isento |
| **Intermediate** | Taxa intermédia |
| **Normal** | Taxa normal |
| **Reduced** | Taxa reduzida |

**Inventory Class**

| Opção no ecrã | Significado |
|---------------|-------------|
| **By-Products** | Subprodutos |
| **Finished Goods** | Produtos acabados |
| **Merchandise** | Mercadorias |
| **Packaging** | Embalagens |
| **Raw Materials** | Matérias-primas |
| **Work in Progress** | Produtos em curso |

### Prices (preços, opcional)

Clique em **Add Price** para cada preço. Pode adicionar vários.

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Number (Price Table)** | Número da tabela de preços (1, 2, 3…). | `1` |
| **Price** | Valor do preço. | `0` |
| **Currency ID** | Número da moeda. | `1` |
| **Begin Date** | Início de validade. | vazio |
| **End Date** | Fim de validade. | vazio |

### Optional Codes (códigos opcionais, por exemplo código de barras)

Clique em **Add Code** para cada código.

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Code** | Código de barras ou código alternativo. | vazio |
| **Optional Code ID** | Número do tipo de código. | `2` |
| **Quantity** | Quantidade associada ao código. | `1` |
| **Supplier ID** | Número do fornecedor associado. | `1` |

### Additional Fields (opcionais)

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Discontinued** | Produto descontinuado. | Desligado |
| **Exempt VAT ID** | Número da isenção de IVA. | `0` |
| **Ignore Header Discount** | Ignorar o desconto do cabeçalho do documento. | Desligado |
| **Ignore Line Discount** | Ignorar o desconto da linha. | Desligado |
| **Notes** | Observações. | vazio |
| **Suspended** | Produto suspenso. | Desligado |
| **Total Price** | O preço indicado é um preço total. | Desligado |

## 6.4 Update — alterar produto

- Preencha o **Product ID**.
- O node vai buscar os dados atuais e **só substitui o que preencher**.
- **SKU** e **Name** aparecem como obrigatórios: preencha-os com os valores atuais se não os quiser alterar.
- **Prices** e **Optional Codes**: se preencher, a lista enviada passa a ser a lista do produto; inclua todos os preços/códigos que pretende manter. *(Confirme num produto de teste.)*
- Em **Additional Fields**, só são alterados os campos que adicionar.
