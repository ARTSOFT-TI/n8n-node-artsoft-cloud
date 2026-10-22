# 3. Utilização básica

## 3.1 Adicionar o node a um fluxo

1. Num fluxo de trabalho, clique em **+**.
2. Pesquise **ARTSOFT** e escolha o node.
3. Em **Credential to connect with**, escolha a credencial criada no [capítulo 2](02-configuracao.md).
4. Escolha a **Resource** (a área, por exemplo cliente ou documento).
5. Escolha a **Operation** (a ação, por exemplo listar ou criar).
6. Preencha os campos que aparecem. Os campos marcados com asterisco (`*`) são obrigatórios.
7. Clique em **Execute step** (executar passo) para testar. O resultado aparece à direita, em **Output**.

## 3.2 Áreas (*Resource*) disponíveis

| Nome no ecrã | O que gere | Capítulo |
|--------------|-----------|----------|
| **Cloud — Customer** | Clientes | [4](04-clientes.md) |
| **Cloud — Supplier** | Fornecedores | [5](05-fornecedores.md) |
| **Cloud — Product** | Produtos/artigos | [6](06-produtos.md) |
| **Cloud — Salesperson** | Vendedores | [7](07-vendedores.md) |
| **Cloud — Document** | Documentos de venda (faturas) e de compra | [8](08-documentos.md) |
| **Cloud — Document Line** | Linhas dentro de um documento | [9](09-linhas-de-documento.md) |
| **Cloud — Current Account** | Débitos, créditos e regularizações | [10](10-conta-corrente.md) |

## 3.3 Tipos de operação

| Operação | O que faz |
|----------|-----------|
| **List** | Devolve uma lista de registos (com pesquisa, ordenação e tamanho de página). |
| **Get** | Devolve **um** registo, a partir do seu número de identificação (**ID**). |
| **Create** | Cria um registo novo. |
| **Update** | Altera um registo existente. |
| **Delete** | Apaga um registo. **Não pode ser desfeito pelo n8n.** |

> **Dica:** antes de usar **Update** ou **Delete** num fluxo automático, experimente sempre com **Execute step** num registo de teste.

## 3.4 O que é o "ID"?

Cada registo (cliente, produto, documento…) tem um número interno único, o **ID**. É este número que as operações **Get**, **Update** e **Delete** pedem (**Customer ID**, **Document ID**, etc.).

> **Atenção:** o ID **não** é o mesmo que o número do cliente (**Number**) nem o NIF. Para saber o ID, use a operação **List** ou **Get**/**Create** e veja o resultado, ou ligue os passos como descrito em [3.8](#38-usar-resultados-de-um-passo-noutro-passo).

## 3.5 Listar: pesquisa, filtro, ordenação e tamanho

As operações de listagem partilham os mesmos campos (exceto a listagem de linhas de documento, descrita no [capítulo 9](09-linhas-de-documento.md)):

| Campo no ecrã | Para que serve | Valor por omissão |
|---------------|----------------|-------------------|
| **Search** | Pesquisa por texto livre (por exemplo parte de um nome). | vazio (sem pesquisa) |
| **Filter** | Condição de filtragem, escrita segundo as regras do ARTSOFT Cloud Invoice. *(A sintaxe depende do produto; consulte o manual do ARTSOFT Cloud Invoice.)* | vazio |
| **Page Size** | Quantos resultados devolve de cada vez. | `10` |
| **Sort By** | Nome do campo pelo qual ordenar. | vazio |
| **Direction** | **Ascending** (do menor para o maior / A-Z) ou **Descending** (inverso). | **Ascending** |

Pontos importantes:

- Cada execução devolve **uma página** de resultados. Para obter mais registos de uma vez, aumente **Page Size**.
- Campos deixados em branco são ignorados.

## 3.6 Datas

- Nos campos de data (**Document Date**, **Due Date**, etc.) pode escolher a data no calendário do n8n.
- Nos documentos e na conta corrente, a data é enviada no formato `AAAA-MM-DD`. Se deixar a data em branco ao criar, é usada a **data de hoje**.
- Nos campos de data que são texto (por exemplo **Birth Date** em clientes), escreva no formato `AAAA-MM-DD` (exemplo: `1985-03-27`).

## 3.7 Campos opcionais agrupados

Muitos formulários têm um botão **Add Field** ou **Add …** (por exemplo **Additional Fields**). Clique para escolher só os campos extra de que precisa. Os que não escolher não são enviados.

## 3.8 Usar resultados de um passo noutro passo

Pode usar o resultado de um passo no passo seguinte arrastando o valor do painel de dados para o campo pretendido (aparece como uma expressão `{{ ... }}`). Exemplo: criar um cliente e depois usar o ID do cliente criado para outro passo. Veja os exemplos no [capítulo 11](11-exemplos.md).

## 3.9 Vários itens de uma só vez

O node trabalha **um registo de cada vez**: se o passo anterior entregar 20 itens, o node ARTSOFT executa a operação 20 vezes (uma por item).

## 3.10 Erros e "Continue On Fail"

Quando o ARTSOFT Cloud Invoice recusa um pedido (por exemplo, NIF inválido ou registo inexistente), o passo fica a vermelho com a mensagem recebida.

Para que o fluxo continue mesmo quando um item falha:

1. Abra o node → separador **Settings**.
2. Ative **Continue On Fail** (continuar em caso de falha).

Nesse caso, o item com erro é devolvido com um campo `error` com a mensagem, e os restantes itens são processados normalmente.

## 3.11 Utilização com assistentes de IA

O node pode ser usado como ferramenta de um *AI Agent* do n8n. As operações e campos são os mesmos descritos neste manual. Tenha cuidado ao dar a um agente acesso a operações **Delete** e **Update**.

## 3.12 Boas práticas

- Use uma credencial por empresa (NIF).
- Teste com **Execute step** antes de ativar o fluxo.
- Evite **Delete** automático sem confirmação humana.
- Prefira **Update** só com os campos que mudam (ver notas em cada capítulo).
