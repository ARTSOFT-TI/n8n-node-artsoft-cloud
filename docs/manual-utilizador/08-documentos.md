# 8. Documentos

Área: **Cloud — Document**

Gere documentos de **venda** (faturas e equivalentes, chamados *billings* na API) e de **compra** (*purchases*).

| Operação | O que faz |
|----------|-----------|
| **List Invoices** | Lista documentos de venda |
| **List Invoices by SAFT Type** | Lista documentos de venda de um tipo (ex.: FT, NC) |
| **List Purchases** | Lista documentos de compra |
| **List Purchases by SAFT Type** | Lista documentos de compra de um tipo |
| **Get** | Devolve um documento pelo ID |
| **Create Header** | Cria um documento novo (só o cabeçalho, sem linhas) |
| **Update** | Altera um documento e, opcionalmente, assina-o |
| **Delete** | Apaga um documento |

## 8.1 Fluxo recomendado para criar um documento completo

1. **Create Header** — cria o documento vazio e devolve o seu ID.
2. **Cloud — Document Line → Create** — acrescenta uma linha por cada artigo (ver [capítulo 9](09-linhas-de-documento.md)).
3. **Update** — acrescenta comentário, condição de pagamento, desconto, moradas… e, se quiser, **assina** o documento.

## 8.2 Listar documentos

Campos comuns: **Search**, **Filter**, **Page Size**, **Sort By**, **Direction** — ver [3.5](03-utilizacao-basica.md#35-listar-pesquisa-filtro-ordenação-e-tamanho).

Nas operações **… by SAFT Type** existe ainda:

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **SAFT Type** | Sim | Código do tipo de documento. Por omissão `FT`. |

Tipos comuns:

| Código | Documento |
|--------|-----------|
| `FT` | Fatura |
| `FR` | Fatura-recibo |
| `ND` | Nota de débito |
| `NC` | Nota de crédito |

## 8.3 Get e Delete

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Document ID** | Sim | Número de identificação (ID) do documento. |

> Documentos já assinados/comunicados podem não poder ser apagados. O ARTSOFT devolve uma mensagem de erro se a operação não for permitida.

## 8.4 Create Header — criar documento

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **Series ID** | Sim | Número da série do documento (define o tipo e a numeração). |
| **Third Party ID** | Não | Número do cliente ou fornecedor. É ignorado se preencher o NIF. |
| **Tax ID (VAT/NIF)** | Não | NIF do cliente/fornecedor, quando não tem o número (ID). |
| **Warehouse ID** | Sim | Número do armazém. Por omissão `1`. |
| **Create Third Party Automatically** | Não | Se ligado, cria automaticamente o cliente/fornecedor quando o NIF ainda não existe. Por omissão, desligado. |
| **Document Date** | Não | Data do documento. Se vazio, usa a data de hoje. |

Indique o cliente/fornecedor **ou** pelo **Third Party ID** **ou** pelo **Tax ID (VAT/NIF)**.

## 8.5 Update — alterar documento

Só os campos que preencher são enviados; o que deixar vazio (ou `0`) não é alterado.

| Campo | Descrição |
|-------|-----------|
| **Document ID** (obrigatório) | ID do documento a alterar. |
| **Sign on Update** | Se ligado, **assina** o documento depois de o atualizar. Por omissão, desligado. |
| **Comment** | Observação do documento. |
| **Document Reference** | Referência do documento (por exemplo, número de encomenda do cliente). |
| **Payment Condition ID** | Número da condição de pagamento. |
| **VAT Exemption ID** | Número do motivo de isenção de IVA. |
| **Discount (%)** | Desconto global, em percentagem. |

> **Atenção:** como valores `0` e vazios são ignorados, **não é possível** usar este passo para repor o desconto a `0`.
>
> **Atenção:** a assinatura de um documento tem implicações fiscais e normalmente não pode ser revertida. Use **Sign on Update** apenas quando o documento estiver completo.

### Blocos opcionais

Cada bloco é uma coleção: clique em **Add Field** e escolha os campos a enviar.

**Financial Info (Optional)** — informação financeira

| Campo | Descrição |
|-------|-----------|
| **Salesperson ID** | Número do vendedor. |

**Third Party Address (Optional)** — morada do cliente/fornecedor neste documento

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Address** | Rua e número. | vazio |
| **Postal Code** | Código postal. | vazio |
| **Locality** | Localidade. | vazio |
| **Country Code** | Código do país. | `620` |
| **Country Region** | Região do país. | `25` |
| **District** | Distrito (número). | vazio |
| **County** | Concelho (número). | vazio |
| **Parish** | Freguesia (número). | vazio |

**Third Party Contact (Optional)** — contactos do cliente/fornecedor neste documento

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Email** | Email. | vazio |
| **Phone Number** | Telefone. | vazio |
| **Phone Country** | País do telefone (código). | `620` |
| **Mobile Number** | Telemóvel. | vazio |
| **Mobile Country** | País do telemóvel (código). | `620` |

**Loading Place (Optional)** — local de carga (guias de transporte)

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Type** | Tipo de local. | `DOCTERCLOC_PLACE` |
| **Address** | Rua e número. | vazio |
| **Postal Code** | Código postal. | vazio |
| **Locality** | Localidade. | vazio |
| **Country Code** | Código do país. | `620` |
| **Country Region** | Região do país. | `25` |
| **District** / **County** / **Parish** | Distrito / concelho / freguesia (números). | vazio |
| **Date/Time** | Data e hora de carga. | vazio |
| **License Plate** | Matrícula do veículo. | vazio |

**Delivery Place (Optional)** — local de entrega

| Campo | Descrição | Por omissão |
|-------|-----------|-------------|
| **Type** | Tipo de local. | `DOCTERCLOC_DELIVERY` |
| **Address** | Rua e número. | vazio |
| **Postal Code** | Código postal. | vazio |
| **Locality** | Localidade. | vazio |
| **Country Code** | Código do país. | `620` |
| **Country Region** | Região do país. | `25` |
| **District** / **County** / **Parish** | Distrito / concelho / freguesia (números). | vazio |
| **Date/Time** | Data e hora de entrega. | vazio |

> Os valores **Type** dos locais de carga e entrega já vêm preenchidos com os valores corretos; só os altere se souber o que pretende.
