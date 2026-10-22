# 1. Instalação

O node chama-se **`n8n-nodes-artsoft-cloud`** e é instalado como *community node* (nó da comunidade) através do próprio n8n. Não precisa de instalar nada no computador, exceto no caso de instalação própria descrita mais abaixo.

## 1.1 Instalar pelo ecrã do n8n (recomendado)

1. Entre no n8n com um utilizador **proprietário** ou **administrador**.
2. Clique no seu nome/ícone (canto inferior esquerdo) e abra **Settings** (Definições).
3. Abra **Community nodes**.
4. Clique em **Install**.
5. No campo do nome do pacote escreva exatamente:

   ```
   n8n-nodes-artsoft-cloud
   ```

6. Marque a caixa que confirma que compreende os riscos de instalar código da comunidade.
7. Clique em **Install**.

Ao terminar, o node **ARTSOFT** fica disponível ao pesquisar nodes num fluxo de trabalho.

> **Nota:** Se o botão **Community nodes** não aparecer, a sua instância pode ter esta funcionalidade desativada. Peça ao responsável pela instalação do n8n para a ativar.

## 1.2 Instalação própria (n8n instalado num servidor)

Se a sua empresa gere o próprio n8n, o responsável técnico pode também instalar o pacote na pasta de dados do n8n:

```
npm install n8n-nodes-artsoft-cloud
```

Depois é necessário reiniciar o n8n. Este passo deve ser feito por quem administra o servidor.

## 1.3 Atualizar para uma nova versão

1. Abra **Settings → Community nodes**.
2. Se existir uma versão mais recente, aparece um botão **Update** junto ao pacote `n8n-nodes-artsoft-cloud`.
3. Clique em **Update** e confirme.

Os fluxos de trabalho existentes continuam a funcionar: os nomes internos dos campos mantêm-se entre versões.

## 1.4 Remover o node

1. Abra **Settings → Community nodes**.
2. Junto a `n8n-nodes-artsoft-cloud`, escolha **Uninstall**.

> **Atenção:** Os fluxos que usam o node ARTSOFT deixam de funcionar até o node ser instalado de novo.

## 1.5 Verificar se ficou instalado

1. Crie um novo fluxo de trabalho (**Create Workflow**).
2. Clique em **+** para adicionar um passo e pesquise por **ARTSOFT**.
3. Se aparecer o node com o logótipo ARTSOFT, a instalação está concluída.

Passo seguinte: [Configuração](02-configuracao.md).
