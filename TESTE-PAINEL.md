# 🧪 Guia de Teste do Painel Admin

## Passo a Passo para Testar

### 1. Servidor rodando
✅ O servidor já está rodando na porta 4449

### 2. Acesse o painel admin

Abra no navegador:
```
http://localhost:4449/admin
```

### 3. Faça login

1. Digite o PIN: `98099596`
2. Clique em "ENTRAR"
3. Você deve ser autenticado com sucesso

### 4. Teste criação de produto

1. Clique em **"+ NOVO PRODUTO"**

2. Preencha os campos:
   - **Nome**: Fone Bluetooth Premium
   - **Descrição**: Som incrível e bateria que dura o dia todo
   - **URL da Imagem**: https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz5h6q7w8x9y0z
   - **Link de Afiliado**: https://shope.ee/teste123

3. Clique em **"SALVAR"**

4. O produto deve aparecer na lista

### 5. Teste edição de produto

1. Clique em **"Editar"** no produto criado

2. Mude o nome para: "Fone Bluetooth Super Premium"

3. Clique em **"SALVAR"**

4. O produto deve ser atualizado

### 6. Teste visualização no site público

1. Abra em outra aba: http://localhost:4449

2. Você deve ver o produto na vitrine

3. Clique em **"COMPRAR AGORA"**

4. Deve abrir o link da Shopee em nova aba

### 7. Teste deleção de produto

1. Volte ao painel admin

2. Clique em **"Deletar"** no produto

3. Confirme a exclusão

4. O produto deve sumir da lista

5. Recarregue a página pública - produto não deve aparecer

### 8. Teste proteção contra brute force

1. Faça logout (clique em "Sair")

2. Tente fazer login com PIN errado: `00000000`

3. Repita 5 vezes

4. Na 6ª tentativa você deve ser bloqueado por 15 minutos

5. Mensagem: "Muitas tentativas. Tente novamente em 15 minutos."

### 9. Teste validações

Tente criar produto com dados inválidos:

#### Teste 1: Nome muito curto
- Nome: "AB"
- Deve mostrar erro: "Nome deve ter no mínimo 3 caracteres"

#### Teste 2: URL de imagem inválida
- Imagem: http://exemplo.com/imagem.jpg (HTTP, não HTTPS)
- Deve mostrar erro: "URL da imagem inválida"

#### Teste 3: URL de imagem de domínio não permitido
- Imagem: https://google.com/image.jpg
- Deve mostrar erro: "URL da imagem inválida"

#### Teste 4: Link de afiliado inválido
- Link: https://amazon.com/produto
- Deve mostrar erro: "Link de afiliado inválido"

### 10. Teste sessão expirada

1. Faça login normalmente

2. Espere 2 horas (ou edite `TOKEN_DURATION` em `src/lib/auth.ts` para 60 segundos)

3. Tente adicionar um produto

4. Deve ser redirecionado para login (sessão expirada)

---

## URLs de Teste Válidas

### Imagens da Shopee (exemplos):
```
https://cf.shopee.com.br/file/br-11134207-7r98o-exemplo
https://down-br.img.susercontent.com/file/exemplo123
https://img.susercontent.com/file/exemplo456
```

### Links de Afiliado (exemplos):
```
https://shope.ee/ABC123DEF
https://shopee.com.br/produto-teste
https://shopee.com/product-example
```

---

## Checklist de Funcionalidades

- [ ] Login com PIN funciona
- [ ] Rate limiting bloqueia após 5 tentativas
- [ ] Criar produto salva corretamente
- [ ] Editar produto atualiza dados
- [ ] Deletar produto remove da lista
- [ ] Produtos aparecem no site público
- [ ] Botão "COMPRAR AGORA" abre link correto
- [ ] Validações impedem dados inválidos
- [ ] Apenas URLs HTTPS são aceitas
- [ ] Apenas domínios Shopee são aceitos
- [ ] Sessão expira após 2 horas
- [ ] Logout funciona corretamente
- [ ] Site responsivo (teste no mobile)

---

## Dicas de Teste

1. **Abra DevTools** (F12) para ver requisições e erros

2. **Teste no mobile**: F12 → ícone de celular

3. **Limpe cookies** se quiser testar autenticação do zero:
   - DevTools → Application → Cookies → Delete All

4. **Veja logs do servidor** no terminal onde rodou `npm run dev`

---

## Problemas Comuns

### Erro: "PIN inválido"
- Verifique se o PIN em `.env.local` está correto
- PIN deve ter 6-8 dígitos

### Erro: "Não autenticado"
- Faça login novamente
- Limpe cookies e tente de novo

### Produto não aparece no site
- Recarregue a página (F5)
- Verifique se salvou corretamente

### Erro ao salvar produto
- Verifique se as URLs são válidas
- URLs devem ser HTTPS
- Domínios devem ser da Shopee

---

**Tudo funcionando?** 🎉

Se sim, você está pronto para fazer deploy na Vercel!
