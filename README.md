# 🇧🇷 Promoções Brasil Imperdíveis

Vitrine de produtos afiliados da Shopee com painel admin seguro - focado em conversão, simplicidade e mobile-first.

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)** | ⚡ Comece em 5 minutos |
| **[RESUMO-SISTEMA.md](RESUMO-SISTEMA.md)** | 📋 Visão geral completa do sistema |
| **[SEGURANCA.md](SEGURANCA.md)** | 🔐 Documentação de segurança (9 camadas) |
| **[DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)** | 🚀 Guia completo de deploy |
| **[TESTE-PAINEL.md](TESTE-PAINEL.md)** | 🧪 Como testar o painel admin |
| **README.md** (este arquivo) | 📖 Guia de uso geral |

## ✨ Novidade: Painel Admin Seguro

Agora você pode gerenciar produtos sem tocar em código!

- 🔐 Login com PIN seguro
- ➕ Adicionar produtos via interface
- ✏️ Editar produtos existentes
- 🗑️ Deletar produtos
- 🛡️ 9 camadas de proteção

**Acesse**: http://localhost:4449/admin (PIN padrão: `98099596`)

---

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 3. Configurar PIN do painel admin

1. Abra o arquivo `.env.local`
2. Mude o PIN padrão para seu código secreto:

```env
ADMIN_PIN=98099596  # Mude este número!
```

**IMPORTANTE**: Use um PIN forte de 6-8 dígitos e mantenha em segredo!

### 4. Acessar o painel admin

1. Acesse: `http://localhost:4449/admin`
2. Digite seu PIN
3. Gerencie produtos pela interface visual

#### Agora você pode:
- ✅ Adicionar produtos sem tocar em código
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Tudo via interface web segura

#### Como pegar a URL da imagem da Shopee:

1. Abra o produto na Shopee
2. Clique com botão direito na imagem
3. Selecione "Copiar endereço da imagem"
4. Cole no campo `image`

#### Exemplo completo:

```typescript
export const products: Product[] = [
  {
    id: 1,
    name: "Fone Bluetooth Premium",
    description: "Som perfeito, bateria dura o dia todo",
    image: "https://cf.shopee.com.br/file/br-11134207-7r98o-lz123456789",
    affiliateLink: "https://shope.ee/ABC123DEF"
  },
  {
    id: 2,
    name: "Carregador Rápido 65W",
    description: "Carrega seu celular em minutos",
    image: "https://cf.shopee.com.br/file/br-11134207-7r98o-lz987654321",
    affiliateLink: "https://shope.ee/XYZ789GHI"
  }
]
```

### 5. Deploy na Vercel

#### Opção 1: Via GitHub (Recomendado)

1. Crie um repositório no GitHub
2. Faça upload do projeto
3. Acesse [vercel.com](https://vercel.com)
4. Clique em "Import Project"
5. Selecione seu repositório
6. Clique em "Deploy"

#### Opção 2: Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### 6. Conectar domínio próprio

1. Acesse seu projeto na Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio
4. Configure o DNS conforme instruções da Vercel

## 📱 Layout

- **Mobile**: 2 colunas fixas
- **Desktop**: 3-4 colunas responsivas
- **Estilo**: Dark premium com glassmorphism

## 🎨 Customização

### Mudar cores do gradiente

Edite `src/components/Header.tsx`:

```typescript
// Linha do título
className="... from-purple-400 to-pink-400 ..."
```

Edite `src/components/ProductCard.tsx`:

```typescript
// Linha do botão
className="... from-purple-600 to-pink-600 ..."
```

### Mudar nome e descrição

Edite `src/components/Header.tsx`:

```typescript
<h1>Seu Nome Aqui</h1>
<p>Sua descrição aqui</p>
```

## 📂 Estrutura de pastas

```
Vitrine/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais + glassmorphism
│   │   ├── layout.tsx       # Layout base
│   │   └── page.tsx         # Página principal
│   ├── components/
│   │   ├── Header.tsx       # Cabeçalho
│   │   ├── Footer.tsx       # Rodapé
│   │   └── ProductCard.tsx  # Card de produto
│   └── data/
│       └── products.ts      # ⭐ EDITE AQUI PARA ADICIONAR PRODUTOS
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## ✅ Checklist de deploy

- [ ] Adicionar produtos em `src/data/products.ts`
- [ ] Testar localmente com `npm run dev`
- [ ] Verificar se imagens carregam corretamente
- [ ] Testar links de afiliado (abrem em nova aba)
- [ ] Fazer deploy na Vercel
- [ ] Conectar domínio próprio
- [ ] Compartilhar link na bio das redes sociais

## 🛠 Tecnologias

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Glassmorphism UI**

## 💡 Dicas

- Adicione produtos aos poucos e teste
- Use imagens de boa qualidade da Shopee
- Descrições curtas vendem mais
- Atualize produtos conforme seus vídeos
- Monitore conversões pelo painel da Shopee

## 📞 Suporte

Se algo não funcionar:

1. Verifique se rodou `npm install`
2. Limpe o cache: `rm -rf .next` e rode `npm run dev` novamente
3. Verifique se as URLs das imagens estão corretas

---

**Feito para converter. Simples, rápido e eficiente.** 🚀
