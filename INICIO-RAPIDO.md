# ⚡ Início Rápido

Guia rápido para começar a usar a vitrine de afiliados Shopee.

## 🎯 Em 5 Minutos

### 1. Acesse o painel admin

Abra no navegador:
```
http://localhost:4449/admin
```

### 2. Faça login

PIN padrão: `98099596`

⚠️ **IMPORTANTE**: Mude este PIN antes de colocar online!

### 3. Adicione seu primeiro produto

1. Clique em **"+ NOVO PRODUTO"**

2. Preencha:
   - **Nome**: Nome chamativo do produto
   - **Descrição**: Frase curta que vende
   - **URL da Imagem**: Copie da Shopee (botão direito → copiar endereço da imagem)
   - **Link de Afiliado**: Seu link de afiliado da Shopee

3. Clique em **"SALVAR"**

### 4. Veja no site

Abra em outra aba:
```
http://localhost:4449
```

Seu produto está na vitrine! 🎉

---

## 📂 Arquivos Importantes

| Arquivo | O que faz |
|---------|-----------|
| `.env.local` | Configure o PIN aqui |
| `src/data/products.ts` | Produtos são salvos aqui |
| `src/app/admin/page.tsx` | Painel admin |

---

## 🔐 Mudar o PIN

1. Abra: `.env.local`
2. Mude a linha:
   ```
   ADMIN_PIN=98099596
   ```
   Para seu código secreto (6-8 dígitos)

3. Reinicie o servidor:
   ```bash
   # Pare o servidor (Ctrl+C)
   npm run dev
   ```

---

## 🚀 Colocar Online

Leia o arquivo: **[DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)**

Resumo:
1. Suba código no GitHub
2. Conecte na Vercel
3. Configure variáveis de ambiente
4. Deploy automático!

---

## 🛡️ Segurança

O sistema já inclui:

✅ Proteção contra brute force (máx 5 tentativas)
✅ Proteção contra timing attacks
✅ Sessão JWT segura (2h de duração)
✅ Validação de URLs (apenas Shopee)
✅ Sanitização contra XSS
✅ Proteção CSRF

Leia mais: **[SEGURANCA.md](SEGURANCA.md)**

---

## 🧪 Testar Tudo

Siga o guia: **[TESTE-PAINEL.md](TESTE-PAINEL.md)**

---

## 📖 Documentação Completa

- **[README.md](README.md)** - Guia completo do projeto
- **[SEGURANCA.md](SEGURANCA.md)** - Documentação de segurança
- **[DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)** - Como fazer deploy
- **[TESTE-PAINEL.md](TESTE-PAINEL.md)** - Como testar o painel

---

## 🆘 Problemas?

### Não consigo fazer login

- Verifique se o PIN está correto em `.env.local`
- PIN deve ter 6-8 dígitos
- Reinicie o servidor

### Produto não aparece no site

- Recarregue a página (F5)
- Verifique se salvou com sucesso
- Veja se não há erros no console (F12)

### Erro ao salvar produto

- URLs devem ser HTTPS
- Imagem deve ser da Shopee
- Link deve ser da Shopee
- Nome mínimo 3 caracteres
- Descrição mínima 10 caracteres

---

## ✅ Checklist Rápido

Antes de colocar online:

- [ ] Mudei o PIN padrão
- [ ] Testei adicionar produto
- [ ] Testei editar produto
- [ ] Testei deletar produto
- [ ] Site está bonito no mobile
- [ ] Links da Shopee funcionam
- [ ] Li [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)
- [ ] Li [SEGURANCA.md](SEGURANCA.md)

---

## 🎨 Personalização

### Mudar nome/descrição do site

Edite: `src/components/Header.tsx`

```typescript
<h1>Seu Nome Aqui</h1>
<p>Sua descrição aqui</p>
```

### Mudar cores

Edite: `src/components/ProductCard.tsx`

```typescript
// Linha do botão
className="... from-purple-600 to-pink-600 ..."
```

Troque `purple` e `pink` por outras cores!

---

## 📊 Próximos Passos

1. Adicione 5-10 produtos
2. Teste tudo
3. Faça deploy na Vercel
4. Configure domínio próprio
5. Compartilhe na bio das redes sociais
6. Monitore conversões na Shopee

---

**Tudo pronto para começar a vender!** 🚀💰

Dúvidas? Leia a documentação completa no [README.md](README.md)
