# 🔐 Documentação de Segurança

Este documento descreve todas as medidas de segurança implementadas no painel admin.

## Camadas de Segurança Implementadas

### 1. Autenticação com PIN

**Proteção**: PIN de 6-8 dígitos configurável

**Implementação**:
- PIN armazenado em variável de ambiente (`.env.local`)
- Nunca exposto no código frontend
- Validação server-side apenas

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts)

---

### 2. Proteção contra Brute Force

**Proteção**: Rate limiting com bloqueio temporário

**Como funciona**:
- Máximo de 5 tentativas de login
- Após 5 tentativas incorretas: bloqueio de 15 minutos
- Contador baseado em IP do cliente
- Reset automático após sucesso

**Implementação**:
```typescript
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutos
```

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:27-70)

---

### 3. Proteção contra Timing Attacks

**Proteção**: Comparação de tempo constante

**O que previne**:
Atacantes não podem deduzir o PIN correto medindo o tempo de resposta da comparação.

**Implementação**:
```typescript
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}
```

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:21-33)

---

### 4. Sessão JWT Segura

**Proteção**: Token JWT com expiração

**Características**:
- Token assinado com chave secreta
- Expiração de 2 horas
- HttpOnly cookie (não acessível via JavaScript)
- SameSite=Strict (previne CSRF)
- Secure flag em produção (HTTPS apenas)

**Implementação**:
```typescript
const TOKEN_DURATION = 60 * 60 * 2 // 2 horas

cookieStore.set(TOKEN_NAME, token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: TOKEN_DURATION,
  path: '/'
})
```

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:101-109)

---

### 5. Proteção contra XSS (Cross-Site Scripting)

**Proteção**: Sanitização de todos os inputs

**O que faz**:
- Remove caracteres perigosos: `< > ' "`
- Limita tamanho dos campos
- Trim de espaços

**Implementação**:
```typescript
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>'"]/g, '')
    .trim()
    .slice(0, 500)
}
```

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:125-131)

---

### 6. Validação de URLs

**Proteção**: Apenas domínios confiáveis

**URLs de imagem permitidas**:
- `shopee.com.br`
- `shopee.com`
- `cf.shopee.com.br`
- `down-br.img.susercontent.com`
- `img.susercontent.com`

**URLs de afiliado permitidas**:
- `shope.ee`
- `shopee.com.br`
- `shopee.com`

**Requisitos**:
- Apenas HTTPS (HTTP bloqueado)
- Domínio deve estar na whitelist

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:136-170)

---

### 7. Validação de Dados

**Proteção**: Validação rigorosa antes de salvar

**Regras**:
- **Nome**: 3-100 caracteres
- **Descrição**: 10-200 caracteres
- **Imagem**: URL válida da Shopee (HTTPS)
- **Link**: URL válida da Shopee (HTTPS)

**Arquivo**: [src/lib/products.ts](src/lib/products.ts:35-68)

---

### 8. Proteção CSRF (Cross-Site Request Forgery)

**Proteção**: SameSite cookies

**Como funciona**:
- Cookie de sessão com `SameSite=Strict`
- Previne requisições de outros sites
- Apenas requisições do mesmo domínio são aceitas

**Arquivo**: [src/lib/auth.ts](src/lib/auth.ts:107)

---

### 9. Autorização em API Routes

**Proteção**: Verificação de autenticação em todas as rotas sensíveis

**Rotas protegidas**:
- `POST /api/products` - Criar produto
- `PUT /api/products` - Editar produto
- `DELETE /api/products` - Deletar produto

**Implementação**:
```typescript
const authenticated = await isAuthenticated()
if (!authenticated) {
  return NextResponse.json(
    { success: false, error: 'Não autenticado' },
    { status: 401 }
  )
}
```

**Arquivo**: [src/app/api/products/route.ts](src/app/api/products/route.ts)

---

## Boas Práticas Adicionais

### Para Deploy na Vercel

1. **Configure variáveis de ambiente na Vercel**:
   - Vá em Settings → Environment Variables
   - Adicione `ADMIN_PIN` com seu PIN secreto
   - Adicione `JWT_SECRET` com uma string aleatória longa

2. **Nunca commite o arquivo `.env.local`**:
   - Já está no `.gitignore`
   - Mantenha o PIN secreto!

3. **Use HTTPS em produção**:
   - A Vercel fornece HTTPS automaticamente
   - Cookies serão marcados como `Secure`

4. **Monitore tentativas de login**:
   - Logs ficam disponíveis na Vercel
   - Monitore IPs com muitas tentativas

### Mude o PIN Padrão!

⚠️ **CRÍTICO**: O PIN padrão `98099596` é apenas para desenvolvimento.

**Para mudar**:
1. Abra `.env.local`
2. Mude `ADMIN_PIN` para seu código secreto
3. Use 6-8 dígitos
4. Mantenha em segredo

### Backups

Recomendações:
- Faça backup regular do arquivo `src/data/products.ts`
- Use Git para versionamento
- Considere fazer backup antes de edições grandes

---

## Limitações e Considerações

### O que este sistema NÃO protege contra:

1. **Acesso físico ao servidor**: Se alguém tem acesso ao código, pode ver o PIN
2. **Keyloggers**: Malware no computador do admin pode capturar o PIN
3. **Shoulder surfing**: Alguém vendo você digitar o PIN
4. **Comprometimento da conta Vercel**: Se sua conta Vercel for hackeada

### Recomendações adicionais:

- Use um gerenciador de senhas para armazenar o PIN
- Não compartilhe o PIN com terceiros
- Acesse o painel apenas de redes confiáveis
- Habilite autenticação de dois fatores na Vercel
- Monitore logs de acesso regularmente

---

## Checklist de Segurança

Antes de colocar em produção:

- [ ] Mudei o PIN padrão para um código secreto forte
- [ ] Configurei `ADMIN_PIN` nas variáveis de ambiente da Vercel
- [ ] Configurei `JWT_SECRET` com uma string aleatória longa
- [ ] Não commitei o arquivo `.env.local` no Git
- [ ] Testei o painel admin localmente
- [ ] Verifiquei que HTTPS está ativo na Vercel
- [ ] Habilitei 2FA na minha conta Vercel
- [ ] Anotei o PIN em local seguro (gerenciador de senhas)

---

## Relatando Problemas de Segurança

Se você encontrar uma vulnerabilidade:

1. **NÃO** abra uma issue pública
2. Entre em contato de forma privada
3. Descreva o problema e como reproduzir
4. Aguarde correção antes de divulgar

---

**Última atualização**: 2025

**Versão do sistema**: 1.0.0
