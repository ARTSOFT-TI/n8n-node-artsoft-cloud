# 2. Configuração

Antes de usar o node, tem de dizer ao n8n **qual é a sua conta ARTSOFT** e **com que chave pode aceder**. Isto faz-se uma única vez, criando uma *credencial* (*Credential*).

## 2.1 O que precisa de ter

| Dado | Onde obter |
|------|-----------|
| **NIF** da sua instância ARTSOFT Cloud Invoice | É o NIF com que a conta está registada (o mesmo que aparece no endereço `https://NIF.artsoft.cloud`). |
| **API Key** (chave de acesso) | Fornecida pelo administrador da sua conta ARTSOFT Cloud Invoice ou pela ARTSOFT. *(O caminho exato para a gerar depende do produto; confirme no manual do ARTSOFT Cloud Invoice.)* |

> **Segurança:** a chave de acesso funciona como uma palavra-passe. Não a partilhe por email nem a escreva em notas dos fluxos. O n8n guarda-a de forma protegida dentro da credencial.

## 2.2 Criar a credencial

1. Adicione um node **ARTSOFT** a um fluxo (ver [Utilização básica](03-utilizacao-basica.md)).
2. No campo **Credential to connect with**, escolha **Create new credential**.
3. Selecione/abra **ARTSOFT Cloud Invoice API** e preencha:

| Campo | O que escrever |
|-------|----------------|
| **NIF** | O NIF da sua instância, apenas números. Exemplo: `123456789`. |
| **API Key** | A chave de acesso. O texto fica escondido. |
| **Development** | **Deixe desligado.** Só deve ser ligado por técnicos que trabalhem com uma instalação local de desenvolvimento. |

4. Clique em **Save**. O n8n faz um teste automático e mostra uma mensagem de sucesso (*Connection tested successfully*) ou de erro.

## 2.3 Dar um nome à credencial

No topo da janela, clique no nome da credencial e altere-o para algo identificável, por exemplo **ARTSOFT — Empresa XPTO**. É útil se trabalhar com mais do que uma empresa: crie uma credencial por NIF.

## 2.4 O teste da ligação

O teste faz a leitura de **um cliente** da sua conta. Por isso, a chave tem de ter permissão para **consultar clientes**. Se o teste falhar:

| Mensagem/sintoma | Causa provável |
|------------------|----------------|
| Erro de autorização / acesso recusado | Chave de acesso incorreta, expirada, ou sem permissões. |
| Não encontra o endereço / tempo esgotado | NIF mal escrito, ou o servidor não está acessível a partir do n8n. |
| Falha só no teste, mas a chave só deve gerir documentos | A chave não tem permissão de leitura de clientes. Peça essa permissão. |

Veja mais em [Problemas frequentes](12-problemas-frequentes.md).

## 2.5 Partilhar a credencial com colegas

Em n8n, as credenciais pertencem a quem as cria. Para que outros colegas usem a mesma ligação, partilhe-a no próprio n8n (botão **Share** na janela da credencial), se a sua versão o permitir. Os colegas poderão usá-la, mas não veem a chave de acesso.

## 2.6 Alterar ou remover a chave

Abra **Credentials** no menu do n8n, escolha **ARTSOFT Cloud Invoice API**, altere os campos e grave. Todos os fluxos que a usam passam a usar a nova chave.
