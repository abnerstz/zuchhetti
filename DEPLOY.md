# 🚀 Guia de Deploy e CI/CD

Este documento explica como configurar e usar o CI/CD do projeto.

## 📋 Índice

- [Pipeline Atual](#pipeline-atual)
- [Como Ativar](#como-ativar)
- [Opções de Deploy](#opções-de-deploy)
  - [Vercel (Recomendado)](#1-vercel-recomendado)
  - [Netlify](#2-netlify)
  - [GitHub Pages](#3-github-pages)
- [Secrets do GitHub](#configurar-secrets-do-github)
- [Troubleshooting](#troubleshooting)

---

## 🔄 Pipeline Atual

O projeto possui um pipeline de CI/CD completo configurado em `.github/workflows/ci.yml`:

### Jobs Executados Automaticamente:

#### 1️⃣ **Lint & Test**
- ✅ Verifica formatação (Prettier)
- ✅ Executa linter (ESLint)
- ✅ Roda todos os testes (Jest)
- ✅ Gera relatório de cobertura

#### 2️⃣ **Build**
- ✅ Compila a aplicação para produção
- ✅ Faz upload dos artifacts

#### 3️⃣ **Deploy** (Opcional)
- ⏸️ Aguardando configuração da plataforma

### Quando é Executado:

- ✅ **Push** para branches `main` ou `develop`
- ✅ **Pull Request** para `main` ou `develop`

---

## 🎯 Como Ativar

### 1. Fazer Push para o GitHub

```bash
# Inicializar repositório Git (se necessário)
git init

# Adicionar remote do GitHub
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Fazer commit e push
git add .
git commit -m "feat: configuração inicial com CI/CD"
git push -u origin main
```

### 2. Verificar Execução

1. Acesse seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Você verá o workflow **"CI/CD Pipeline"** em execução
4. Clique no workflow para ver detalhes de cada job

### 3. Badge de Status (Opcional)

Adicione um badge do CI/CD ao README:

```markdown
![CI/CD](https://github.com/SEU-USUARIO/SEU-REPOSITORIO/workflows/CI%2FCD%20Pipeline/badge.svg)
```

---

## 🌐 Opções de Deploy

O projeto está pronto para deploy em diversas plataformas. Escolha uma:

### 1. Vercel (Recomendado)

**Vantagens:**
- ✅ Deploy automático mais rápido
- ✅ Preview de PRs
- ✅ Analytics integrado
- ✅ Edge Network global
- ✅ Zero configuração para Vite

#### Opção A: Deploy via Interface (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Vercel detecta automaticamente as configurações do Vite
5. Clique em "Deploy"

✅ **Pronto!** O Vercel fará deploy automático a cada push.

#### Opção B: Deploy via GitHub Actions

1. Renomeie o arquivo:
```bash
mv .github/workflows/deploy-vercel.yml.example .github/workflows/deploy-vercel.yml
```

2. Obtenha as credenciais:
```bash
# Instale o CLI
npm i -g vercel

# Faça login
vercel login

# Vincule o projeto
vercel link
```

3. Configure os Secrets no GitHub (veja seção abaixo)

---

### 2. Netlify

**Vantagens:**
- ✅ Configuração simples
- ✅ Preview de PRs
- ✅ Forms e Functions integrados
- ✅ Redirects e headers customizados

#### Opção A: Deploy via Interface (Mais Fácil)

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Conecte com GitHub
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em "Deploy site"

✅ **Pronto!** O Netlify fará deploy automático a cada push.

#### Opção B: Deploy via GitHub Actions

1. Renomeie o arquivo:
```bash
mv .github/workflows/deploy-netlify.yml.example .github/workflows/deploy-netlify.yml
```

2. Configure os Secrets no GitHub (veja seção abaixo)

---

### 3. GitHub Pages

**Vantagens:**
- ✅ Totalmente gratuito
- ✅ Integrado ao GitHub
- ✅ Simples de configurar

**Desvantagens:**
- ⚠️ Apenas sites estáticos
- ⚠️ URL: `usuario.github.io/repositorio`

#### Passos:

1. Atualize `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/nome-do-seu-repositorio/',
  // ... resto da configuração
})
```

2. Renomeie o arquivo:
```bash
mv .github/workflows/deploy-pages.yml.example .github/workflows/deploy-pages.yml
```

3. No GitHub:
   - Vá em **Settings** → **Pages**
   - Em "Source", selecione **"GitHub Actions"**

4. Faça push e aguarde o deploy

✅ Seu site estará em: `https://seu-usuario.github.io/seu-repositorio/`

---

## 🔐 Configurar Secrets do GitHub

Secrets são variáveis de ambiente seguras usadas no CI/CD.

### Como Adicionar Secrets:

1. No GitHub, vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **"New repository secret"**
3. Adicione os secrets necessários

### Secrets por Plataforma:

#### Para Vercel:
```
VERCEL_TOKEN          # Token de acesso (https://vercel.com/account/tokens)
VERCEL_ORG_ID         # Encontre em .vercel/project.json
VERCEL_PROJECT_ID     # Encontre em .vercel/project.json
```

#### Para Netlify:
```
NETLIFY_AUTH_TOKEN    # Personal access token da Netlify
NETLIFY_SITE_ID       # API ID do site (Settings > Site details)
```

#### Para GitHub Pages:
```
Não precisa de secrets! Usa o token padrão do GitHub.
```

---

## 🛠 Troubleshooting

### ❌ Testes falhando no CI

**Problema:** Testes passam localmente mas falham no CI.

**Soluções:**
```bash
# Limpe o cache do Jest
npm run test -- --clearCache

# Execute com mesma config do CI
CI=true npm test

# Verifique variáveis de ambiente
cat .github/workflows/ci.yml
```

### ❌ Build falhando

**Problema:** Build funciona localmente mas falha no CI.

**Soluções:**
```bash
# Teste o build limpo
rm -rf node_modules package-lock.json
npm install
npm run build

# Verifique warnings de TypeScript
npm run build -- --emitDeclarationOnly false
```

### ❌ ESLint com muitos erros

**Problema:** Muitos erros de lint no CI.

**Soluções:**
```bash
# Execute o fix localmente
npm run lint:fix

# Commit as correções
git add .
git commit -m "fix: correções de lint"
git push
```

### ❌ Deploy falha no Vercel/Netlify

**Problema:** Deploy falha após build bem-sucedido.

**Verificações:**
1. ✅ Secrets configurados corretamente?
2. ✅ Permissões do GitHub Actions ativadas?
3. ✅ Token não expirado?
4. ✅ Branch correto configurado?

---

## 📊 Monitoramento

### Ver logs do CI/CD:
1. GitHub → Actions → Workflow específico
2. Clique no job para ver logs detalhados

### Ver métricas de deploy:

- **Vercel:** Dashboard → Analytics
- **Netlify:** Site → Analytics
- **GitHub Pages:** Insights → Traffic

---

## 🎯 Próximos Passos

Após configurar o deploy, considere:

- [ ] Configurar environment variables (se necessário)
- [ ] Adicionar preview deployments para PRs
- [ ] Configurar domínio customizado
- [ ] Ativar HTTPS/SSL
- [ ] Configurar cache headers
- [ ] Adicionar monitoring (Sentry, LogRocket)
- [ ] Configurar analytics (Vercel Analytics, Google Analytics)

---

## 📚 Links Úteis

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

---

<div align="center">

**Dúvidas?** Abra uma issue no repositório!

[⬆ Voltar ao topo](#-guia-de-deploy-e-cicd)

</div>

