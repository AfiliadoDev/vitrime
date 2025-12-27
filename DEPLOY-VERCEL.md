# 🚀 Guia Completo de Deploy na Vercel

## Opção 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `vitrine-shopee` (ou o que preferir)
3. Deixe **privado** (recomendado para segurança)
4. Clique em **"Create repository"**

### Passo 2: Subir o código

Abra o terminal e execute:

```bash
cd "c:\Users\darke\Desktop\Vitrine"

# Inicializa Git (se ainda não foi feito)
git init

# Adiciona todos os arquivos
git add .

# Cria o primeiro commit
git commit -m "Initial commit - Vitrine Shopee com painel admin"

# Renomeia branch para main
git branch -M main

# Conecta com GitHub (substitua SEU_USUARIO e vitrine-shopee)
git remote add origin https://github.com/SEU_USUARIO/vitrine-shopee.git

# Envia para GitHub
git push -u origin main
```

### Passo 3: Conectar na Vercel

1. Acesse https://vercel.com
2. Faça login ou crie conta (use GitHub para facilitar)
3. Clique em **"Add New..." → "Project"**
4. Selecione o repositório `vitrine-shopee`
5. Clique em **"Import"**

### Passo 4: Configurar Variáveis de Ambiente

**IMPORTANTE**: Antes de fazer deploy, configure as variáveis de ambiente!

1. Na tela de configuração da Vercel, clique em **"Environment Variables"**

2. Adicione as seguintes variáveis:

   | Name | Value |
   |------|-------|
   | `ADMIN_PIN` | `98099596` (ou seu PIN personalizado) |
   | `JWT_SECRET` | `[gere uma string aleatória longa]` |

3. Para gerar o `JWT_SECRET`, use este comando no terminal:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Copie o resultado e cole no valor de `JWT_SECRET`

4. Certifique-se de marcar **"Production"**, **"Preview"** e **"Development"**

### Passo 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Seu site estará online! 🎉

---

## Opção 2: Deploy via CLI

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer login

```bash
vercel login
```

### Passo 3: Deploy

```bash
cd "c:\Users\darke\Desktop\Vitrine"
vercel
```

Siga as instruções interativas.

### Passo 4: Adicionar variáveis de ambiente

```bash
vercel env add ADMIN_PIN
# Digite: 98099596 (ou seu PIN)

vercel env add JWT_SECRET
# Cole a string gerada com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 5: Deploy para produção

```bash
vercel --prod
```

---

## Configurações Importantes na Vercel

### 1. Domínio Personalizado

1. No dashboard do projeto na Vercel
2. Vá em **Settings → Domains**
3. Clique em **"Add"**
4. Digite seu domínio (ex: `promocoesbrasil.com`)
5. Siga as instruções para configurar DNS

### 2. Variáveis de Ambiente

Sempre que mudar o PIN:

1. Vá em **Settings → Environment Variables**
2. Edite `ADMIN_PIN`
3. Salve
4. Faça um novo deploy (ou recarregue a aplicação)

### 3. Proteção de Build

Recomendado para evitar builds acidentais:

1. Vá em **Settings → Git**
2. Configure **Production Branch**: `main`
3. Desabilite **"Auto Deploy"** se quiser controle manual

---

## Checklist Pós-Deploy

- [ ] Site está acessível pela URL da Vercel
- [ ] Painel admin funciona: `https://seu-projeto.vercel.app/admin`
- [ ] Login com PIN funciona
- [ ] Consegue adicionar produtos
- [ ] Produtos aparecem no site público
- [ ] Links da Shopee abrem corretamente
- [ ] Site está responsivo no mobile
- [ ] HTTPS está ativo (cadeado verde)
- [ ] Variáveis de ambiente estão configuradas

---

## URLs Importantes

Após deploy, você terá:

- **Site público**: `https://seu-projeto.vercel.app`
- **Painel admin**: `https://seu-projeto.vercel.app/admin`

---

## Atualizando o Site

### Via GitHub (Automático)

Sempre que você fizer um commit no GitHub, a Vercel faz deploy automaticamente!

```bash
# Faça suas alterações
git add .
git commit -m "Atualização dos produtos"
git push
```

A Vercel detecta e faz deploy automaticamente.

### Via CLI

```bash
vercel --prod
```

---

## Segurança em Produção

### ✅ O que já está configurado:

- HTTPS automático
- Cookies `Secure` (apenas HTTPS)
- Rate limiting contra brute force
- Validação de inputs
- Sanitização contra XSS
- Proteção CSRF
- JWT com expiração

### ⚠️ Recomendações adicionais:

1. **Mude o PIN padrão** para um código secreto forte
2. **Não compartilhe** a URL do painel admin publicamente
3. **Habilite 2FA** na sua conta Vercel
4. **Monitore logs** regularmente em Vercel → Logs
5. **Mantenha o repositório privado** no GitHub
6. **Nunca commite** o arquivo `.env.local`

---

## Monitoramento

### Ver logs de acesso:

1. Acesse o dashboard da Vercel
2. Vá em **Deployments → [último deploy] → Functions**
3. Veja requisições e erros

### Métricas importantes:

- Tentativas de login falhadas
- Tempo de resposta das páginas
- Erros 500 ou 401

---

## Domínio Personalizado (Exemplo)

Se você comprou `promocoesbrasil.com.br`:

1. **Na Vercel**:
   - Settings → Domains
   - Add: `promocoesbrasil.com.br`
   - Add: `www.promocoesbrasil.com.br`

2. **No seu provedor de domínio** (Registro.br, GoDaddy, etc):
   - Tipo: `A`
   - Host: `@`
   - Value: `76.76.21.21`

   - Tipo: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com`

3. Aguarde propagação (até 48h, geralmente 15min)

---

## Problemas Comuns

### Deploy falhou

**Causa**: Erro no código ou variáveis não configuradas

**Solução**:
1. Veja os logs do build na Vercel
2. Verifique se as variáveis de ambiente estão configuradas
3. Tente fazer build localmente: `npm run build`

### PIN não funciona em produção

**Causa**: Variável `ADMIN_PIN` não configurada

**Solução**:
1. Vá em Settings → Environment Variables
2. Adicione `ADMIN_PIN` com seu PIN
3. Faça redeploy

### Erro 500 ao adicionar produto

**Causa**: Permissões de escrita no sistema de arquivos

**Solução**:
Isso é uma limitação da Vercel (serverless).

**IMPORTANTE**: A Vercel tem sistema de arquivos read-only em produção.

Para resolver, você tem 2 opções:

**Opção A** (Simples): Continuar editando localmente e fazendo deploy via Git

**Opção B** (Avançado): Usar banco de dados (Vercel Postgres, Supabase, etc)

Para este projeto de vitrine simples, recomendo **Opção A**:
- Edite produtos localmente no painel admin
- Commite no Git
- Push automático para produção

---

## Workflow Recomendado

1. **Desenvolvimento local**:
   ```bash
   npm run dev
   ```
   Acesse: http://localhost:4449/admin

2. **Adicione/edite produtos** no painel local

3. **Commit e push**:
   ```bash
   git add .
   git commit -m "Adicionado novo produto"
   git push
   ```

4. **Vercel faz deploy automático** em ~1 minuto

5. **Produtos aparecem no site** em produção

---

## Custo

✅ **GRÁTIS** para sempre!

A Vercel oferece plano gratuito com:
- 100 GB de banda mensal
- Deploy ilimitado
- HTTPS gratuito
- Domínio `.vercel.app`

Suficiente para milhares de visitantes por mês!

---

## Próximos Passos

Depois do deploy:

1. [ ] Adicione produtos no painel
2. [ ] Teste tudo em produção
3. [ ] Configure domínio próprio (opcional)
4. [ ] Compartilhe URL na bio das redes sociais
5. [ ] Monitore conversões no painel da Shopee

---

**Pronto para vender!** 🚀💰

Qualquer dúvida, consulte a documentação da Vercel: https://vercel.com/docs
