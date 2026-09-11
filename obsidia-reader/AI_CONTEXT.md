# Contexto do Projeto para Outra IA

## 1. O que é este projeto

Este projeto transforma uma documentação completa sobre arquitetura de software, .NET e microsserviços em uma plataforma web educacional interativa.

Nome atual do produto: **Arquitetura .NET na Prática**.

Proposta de valor:

> Aprenda Clean Architecture, DDD, microsserviços, APIs, Cloud e IA construindo sistemas reais.

A aplicação tem formato de livro digital, mas funciona como uma experiência de estudo moderna: capítulos, aulas, progresso, busca, exemplos de código, diagramas, exercícios e prompts para estudar com IA.

## 2. Estrutura do repositório

A raiz do repositório contém a documentação original em Markdown:

```text
01-fundamentos-arquitetura/
02-dominio-ddd-pratico/
03-dados-persistencia/
04-apis-e-http/
05-comunicacao-microsservicos/
06-resiliencia/
07-seguranca/
08-observabilidade/
09-containerizacao/
10-escalabilidade/
11-cicd-devops/
12-testes/
13-mensageria-eventos/
14-gateway-bff/
15-performance/
16-csharp-dotnet-entrevistas/
17-cloud/
18-arquitetura-distribuida/
19-arquitetura-decisoes/
20-evolucao-legado/
21-ia-engenharia/
obsidia-reader/
README.md
00-MOTOR-GERADOR-UNIVERSAL.md
vercel.json
```

A aplicação web fica em `obsidia-reader/`.

## 3. Stack da aplicação

- Vite
- JavaScript moderno, sem framework de UI
- CSS customizado
- HTML
- Google Fonts: Space Grotesk, Playfair Display e DM Mono
- LocalStorage para salvar progresso de leitura
- Vercel para hospedagem

Não existe backend, banco de dados ou API obrigatória. A aplicação é uma SPA estática executada no navegador.

## 4. Arquivos principais

### `obsidia-reader/index.html`

Ponto de entrada HTML. Contém a div `#app` e carrega `src/main.js`.

### `obsidia-reader/src/main.js`

Arquivo principal da aplicação. Contém:

- Catálogo visual dos 21 capítulos.
- Navegação entre visão geral, capítulos e aulas.
- Estado da aplicação.
- Busca.
- Progresso de aulas concluídas.
- Renderização das telas.
- Integração com o conteúdo gerado dos Markdown.
- Conteúdo pedagógico complementar.
- Ação para copiar prompts de IA.

O estado principal é:

```js
const state = {
  current: 'home',
  selectedLesson: null,
  completed: new Set(...),
  query: ''
};
```

### `obsidia-reader/src/style.css`

Contém o design responsivo da aplicação.

A interface usa:

- Estilo editorial tech.
- Capa com identidade visual .NET e microsserviços.
- Paleta arco-íris nos elementos internos da plataforma.
- Roxo, azul profundo, teal e laranja na capa.
- Layout responsivo para desktop e mobile.
- Sidebar de navegação.
- Cartões de progresso.
- Blocos de código.
- Diagramas de fluxo.
- Cartões de prática e IA.

### `obsidia-reader/scripts/generate-content.mjs`

Parser executado antes do desenvolvimento e do build.

Ele percorre os diretórios de capítulos na raiz, encontra os arquivos `.md` e extrai:

- `chapterId`
- Caminho do arquivo
- Título do frontmatter ou do primeiro heading
- Texto limpo
- Primeiro bloco de código C# encontrado
- Primeiro diagrama Mermaid encontrado
- Quantidade de palavras

O resultado é salvo em:

```text
obsidia-reader/src/generated-content.js
```

Esse arquivo é gerado automaticamente. Não deve ser editado manualmente.

### `obsidia-reader/src/generated-content.js`

Dados gerados a partir da documentação Markdown. É uma camada de build para que o navegador não precise ler arquivos Markdown diretamente.

### `obsidia-reader/package.json`

Scripts importantes:

```json
{
  "scripts": {
    "dev": "vite",
    "predev": "node scripts/generate-content.mjs",
    "prebuild": "node scripts/generate-content.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### `vercel.json` na raiz

Configura o deploy quando a Vercel usa a raiz do repositório:

```json
{
  "buildCommand": "npm run build --prefix obsidia-reader",
  "outputDirectory": "obsidia-reader/dist",
  "installCommand": "npm install --prefix obsidia-reader",
  "framework": "vite"
}
```

Existe também uma configuração em `obsidia-reader/vercel.json` para o caso de a Vercel usar a própria pasta como Root Directory.

## 5. Fluxo de conteúdo

O conteúdo segue este caminho:

```text
Markdown da documentação
        ↓
 scripts/generate-content.mjs
        ↓
 src/generated-content.js
        ↓
 src/main.js
        ↓
 Vite
        ↓
 obsidia-reader/dist
        ↓
 Vercel
```

Quando um arquivo Markdown é alterado, basta executar:

```powershell
cd obsidia-reader
npm run build
```

O parser será executado automaticamente antes do Vite.

## 6. Como uma aula é formada

Cada aula possui cinco camadas pedagógicas:

1. **Fundamento**: explicação conceitual.
2. **No dia a dia**: analogia para tornar o conceito intuitivo.
3. **Mão na massa**: exemplo de código C#/.NET.
4. **Fluxo mental**: diagrama visual em etapas.
5. **Prática guiada por IA**: desafio e prompt para investigação.

Além disso, a tela mostra a origem do conteúdo, por exemplo:

```text
Fonte: 01-fundamentos-arquitetura/01-clean-architecture.md
```

Isso mantém transparência entre a interface web e a documentação original.

## 7. Funcionalidades já implementadas

- Visão geral da plataforma.
- 21 capítulos.
- Conteúdo Markdown indexado no build.
- 47 arquivos de aulas encontrados pelo parser.
- Navegação entre capítulos.
- Navegação entre aulas.
- Busca no catálogo.
- Progresso persistido com `localStorage`.
- Marcação de aula concluída.
- Código real extraído dos Markdown quando disponível.
- Resumo do conteúdo original.
- Diagramas Mermaid identificados no conteúdo.
- Exercícios práticos.
- Prompts para IA.
- Botão para copiar prompt.
- Layout responsivo.
- Tema visual editorial tech.
- Capa com identidade .NET e microsserviços.
- Configuração de deploy na Vercel.

## 8. Como executar localmente

Na pasta da aplicação:

```powershell
cd "D:\CENTRAL-ROBO\PROJETOS\pessoal\obsidia\obsidia-reader"
npm install
npm run dev
```

A aplicação normalmente estará em:

```text
http://127.0.0.1:5173/
```

## 9. Como validar antes de publicar

Executar:

```powershell
npm run build
```

O resultado deve mostrar primeiro:

```text
Generated XX lessons from Markdown files.
```

E depois o build do Vite concluído sem erros.

Também verificar:

- A capa abre corretamente.
- O botão de começar leva ao capítulo 01.
- O primeiro item abre a aula.
- A aula mostra a fonte Markdown.
- O bloco de código aparece.
- O progresso pode ser marcado.
- O layout não cria overflow horizontal em mobile.

## 10. Como publicar

O repositório remoto é:

```text
https://github.com/alexnfeitozad/Arquitetura-microservicos.NET.git
```

A aplicação está na branch `main`.

Para enviar alterações:

```powershell
cd "D:\CENTRAL-ROBO\PROJETOS\pessoal\obsidia"
git add obsidia-reader
 git commit -m "mensagem da alteração"
git push origin main
```

## 11. Deploy na Vercel

A Vercel deve importar o repositório GitHub e usar a configuração da raiz.

Configuração equivalente:

- Framework: Vite
- Install Command: `npm install --prefix obsidia-reader`
- Build Command: `npm run build --prefix obsidia-reader`
- Output Directory: `obsidia-reader/dist`
- Root Directory: vazio, usando a raiz do repositório

Se a Vercel retornar `404 NOT_FOUND`, verificar primeiro se o Root Directory está apontando para uma pasta inexistente. O app está dentro de `obsidia-reader`, mas a configuração da raiz já sabe executar os comandos com `--prefix`.

## 12. Regras para futuras alterações

- Não editar `src/generated-content.js` manualmente.
- Alterações de conteúdo devem ser feitas nos arquivos Markdown da documentação.
- Alterações de comportamento devem ser feitas em `src/main.js`.
- Alterações visuais devem ser feitas em `src/style.css`.
- Sempre executar `npm run build` depois de alterar o parser, `main.js`, `style.css` ou arquivos Markdown.
- Manter a aplicação sem backend enquanto o objetivo for leitura estática.
- Preservar a responsividade.
- Evitar remover a origem do Markdown exibida na aula.
- Não substituir a documentação original por conteúdo inventado.
- Quando um Markdown não possuir código ou Mermaid, usar o conteúdo pedagógico de fallback da aplicação.
- Usar português do Brasil na interface e na documentação de produto.

## 13. Próximas evoluções possíveis

- Renderizar Mermaid de verdade, em vez de mostrar apenas o fluxo resumido.
- Renderizar Markdown completo dentro da aula.
- Gerar páginas estáticas por aula para SEO.
- Adicionar URLs com hash ou roteamento por capítulo/aula.
- Adicionar modo escuro.
- Criar quizzes por aula.
- Adicionar notas pessoais do estudante.
- Criar autenticação e sincronização de progresso.
- Adicionar analytics de leitura sem coletar dados sensíveis.
- Criar Open Graph image para compartilhamento nas redes sociais.
- Criar uma página de apresentação pública para divulgar o projeto.

## 14. Instrução para uma IA continuar o projeto

Antes de editar:

1. Leia este arquivo.
2. Leia `package.json`.
3. Leia `scripts/generate-content.mjs` se a alteração envolver conteúdo.
4. Verifique se a mudança pertence ao Markdown, ao parser, ao JavaScript ou ao CSS.
5. Faça a menor alteração possível.
6. Execute `npm run build` imediatamente após a alteração.
7. Verifique a tela correspondente no navegador.
8. Não remova alterações existentes sem confirmação.

A prioridade do projeto é:

```text
Conteúdo fiel à documentação
> aprendizado claro
> navegação simples
> visual moderno
> build confiável
> deploy fácil
```
