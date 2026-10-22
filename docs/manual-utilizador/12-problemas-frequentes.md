# 12. Problemas frequentes

| Problema | Causa provável | O que fazer |
|----------|----------------|-------------|
| O node **ARTSOFT** não aparece na pesquisa | Node não instalado ou n8n não reiniciado (instalação própria) | Verifique em **Settings → Community nodes**. Em instalação própria, reinicie o n8n. |
| Não vejo **Community nodes** nas definições | Funcionalidade desativada ou sem permissões | Peça a um administrador do n8n. |
| O teste da credencial falha | NIF ou chave incorretos; chave sem permissão de ler clientes; servidor inacessível | Confirme o NIF (só números), crie uma nova chave nas configurações da Empresa e confirme as permissões. |
| Erro `ARTSOFT Cloud Invoice API request to … failed` seguido de uma mensagem | O ARTSOFT recusou o pedido | Leia a mensagem: normalmente indica o campo ou regra em falta (NIF inválido, série inexistente, registo não encontrado…). |
| `ARTSOFT error: …` | O ARTSOFT respondeu com um código de erro | Anote o código/mensagem e confirme os dados enviados. |
| **Get/Update/Delete** diz que o registo não existe | O **ID** está errado (por exemplo, usou o **Number** ou o NIF) | Use **List** para descobrir o ID correto. |
| Ao atualizar, um campo não muda | Campos vazios ou `0` são ignorados no **Update** (documentos e conta corrente) | Preencha o campo com o novo valor; para "limpar" valores, faça-o diretamente no ARTSOFT. |
| Ao atualizar um cliente/fornecedor, o campo **Is Company** muda | Esta caixa é sempre aplicada | Confirme o seu estado antes de executar. |
| Só aparecem 10 resultados | **Page Size** por omissão é `10` | Aumente **Page Size**. Nas linhas de documento, use também **Page**. |
| Não consigo apagar um registo | O ARTSOFT pode impedir apagar registos com movimentos/documentos associados | Veja a mensagem de erro; inative o registo em vez de o apagar (**Inactive** / **Status**), quando disponível. |
| Quantidade ou preço com demasiadas casas decimais | O ARTSOFT limita as casas decimais | Arredonde para 2 casas decimais. |
| O fluxo pára no primeiro erro | Comportamento normal | Ative **Continue On Fail** nas **Settings** do node. |

## Quando pedir ajuda

Ao contactar o suporte, indique:

1. O nome da **Resource** e da **Operation** usadas.
2. A mensagem de erro completa (copie-a do painel de resultados).
3. A versão do node (em **Settings → Community nodes**).

**Não** envie a sua chave de acesso (*API Key*).

## Mais informação

- Código-fonte e pedidos de melhoria: <https://github.com/ARTSOFT-TI/n8n-node-artsoft-cloud>
- Documentação n8n sobre *community nodes*: <https://docs.n8n.io/integrations/community-nodes/>
- Manual do ARTSOFT Cloud Invoice: <https://artsoft-cloud.eniston.com/>
