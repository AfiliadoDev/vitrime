// ============================================
// ARQUIVO DE CONFIGURAÇÃO DOS PRODUTOS
// ============================================
// INSTRUÇÕES:
// 1. Copie um produto existente
// 2. Cole no final da lista
// 3. Edite as informações:
//    - id: número único e sequencial
//    - name: nome do produto (curto e direto)
//    - description: descrição curta que vende
//    - image: URL da imagem da Shopee (clique com botão direito > copiar endereço da imagem)
//    - images: [OPCIONAL] Array com 3-5 URLs de imagens adicionais para galeria do produto
//    - affiliateLink: seu link de afiliado da Shopee
//    - category: escolha uma categoria (Cozinha, Quarto, Sala, Banheiro, Eletrônicos, Moda, Beleza, etc)
//               ou crie uma nova digitando o nome
//    - createdAt: data de criação (gerada automaticamente)
// 4. Salve o arquivo
// 5. O site atualiza automaticamente
// ============================================

export interface Product {
  id: number
  name: string
  description: string
  image: string
  images?: string[] // OPCIONAL: Array com 3-5 imagens adicionais para a galeria
  affiliateLink: string
  category: string
  createdAt: string
}

export const products: Product[] = [
  {
    "id": 1,
    "name": "Dispenser De Gelo Bandeja Caixa 48 Cubos Com Gaveta Botão Solta Gelo E Pegador Luxo",
    "description": "Transforme a maneira como você faz gelo com esta forma de gelo automática inovadora! Compacta e funcional, ela é perfeita para quem busca praticidade e estilo na cozinha.",
    "image": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32fcmqrnwg5af.webp",
    "images": [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32fcmqrnwg5af.webp",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32fcmqrnwg5af.webp"
    ],
    "affiliateLink": "https://s.shopee.com.br/4AtD5wE3bj",
    "category": "Cozinha",
    "createdAt": "2025-12-26T00:00:00.000Z"
  }
]
