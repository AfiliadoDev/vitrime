import fs from 'fs/promises'
import path from 'path'
import { Product } from '@/data/products'
import { sanitizeString, validateImageUrl, validateAffiliateUrl } from './auth'

const PRODUCTS_FILE = path.join(process.cwd(), 'src', 'data', 'products.ts')

/**
 * Lê os produtos do arquivo
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, 'utf-8')

    // Extrai o array de produtos usando regex mais robusto
    const match = fileContent.match(/export const products: Product\[\] = (\[[\s\S]*\])\s*$/m)

    if (!match) {
      console.error('Regex não encontrou produtos')
      return []
    }

    // Avalia o array de forma segura
    const productsArray = JSON.parse(match[1]) as Product[]
    return productsArray || []
  } catch (error) {
    console.error('Erro ao ler produtos:', error)
    return []
  }
}

/**
 * Valida um produto antes de salvar
 */
function validateProduct(product: Partial<Product>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Valida nome
  if (!product.name || product.name.trim().length < 3) {
    errors.push('Nome deve ter no mínimo 3 caracteres')
  }
  if (product.name && product.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)')
  }

  // Valida descrição
  if (!product.description || product.description.trim().length < 10) {
    errors.push('Descrição deve ter no mínimo 10 caracteres')
  }
  if (product.description && product.description.length > 200) {
    errors.push('Descrição muito longa (máximo 200 caracteres)')
  }

  // Valida URL da imagem
  if (!product.image || !validateImageUrl(product.image)) {
    errors.push('URL da imagem inválida. Use apenas imagens da Shopee (HTTPS)')
  }

  // Valida link de afiliado
  if (!product.affiliateLink || !validateAffiliateUrl(product.affiliateLink)) {
    errors.push('Link de afiliado inválido. Use apenas links da Shopee (HTTPS)')
  }

  // Valida categoria
  if (!product.category || product.category.trim().length < 2) {
    errors.push('Categoria deve ter no mínimo 2 caracteres')
  }
  if (product.category && product.category.length > 50) {
    errors.push('Categoria muito longa (máximo 50 caracteres)')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Sanitiza um produto
 */
function sanitizeProduct(product: Partial<Product>): Partial<Product> {
  return {
    id: product.id,
    name: product.name ? sanitizeString(product.name) : '',
    description: product.description ? sanitizeString(product.description) : '',
    image: product.image ? product.image.trim() : '',
    images: product.images || [],
    affiliateLink: product.affiliateLink ? product.affiliateLink.trim() : '',
    category: product.category ? sanitizeString(product.category) : '',
    createdAt: product.createdAt || new Date().toISOString()
  }
}

/**
 * Salva produtos no arquivo
 */
export async function saveProducts(products: Product[]): Promise<{ success: boolean; error?: string }> {
  try {
    // Valida todos os produtos
    for (const product of products) {
      const validation = validateProduct(product)
      if (!validation.valid) {
        return {
          success: false,
          error: `Produto ${product.id}: ${validation.errors.join(', ')}`
        }
      }
    }

    // Sanitiza produtos
    const sanitizedProducts = products.map(sanitizeProduct)

    // Gera o conteúdo do arquivo
    const fileContent = `// ============================================
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

export const products: Product[] = ${JSON.stringify(sanitizedProducts, null, 2)}
`

    // Salva no arquivo
    await fs.writeFile(PRODUCTS_FILE, fileContent, 'utf-8')

    return { success: true }
  } catch (error) {
    console.error('Erro ao salvar produtos:', error)
    return {
      success: false,
      error: 'Erro ao salvar produtos. Tente novamente.'
    }
  }
}

/**
 * Adiciona um novo produto
 */
export async function addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; error?: string; product?: Product }> {
  const products = await getProducts()

  // Gera novo ID
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1

  const newProduct: Product = {
    id: newId,
    ...product
  }

  // Valida
  const validation = validateProduct(newProduct)
  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join(', ')
    }
  }

  // Sanitiza
  const sanitized = sanitizeProduct(newProduct) as Product

  // Adiciona e salva
  products.push(sanitized)
  const result = await saveProducts(products)

  if (result.success) {
    return { success: true, product: sanitized }
  }

  return result
}

/**
 * Atualiza um produto existente
 */
export async function updateProduct(id: number, updates: Partial<Product>): Promise<{ success: boolean; error?: string }> {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    return { success: false, error: 'Produto não encontrado' }
  }

  // Mescla com dados existentes
  const updatedProduct = { ...products[index], ...updates, id }

  // Valida
  const validation = validateProduct(updatedProduct)
  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join(', ')
    }
  }

  // Sanitiza e atualiza
  products[index] = sanitizeProduct(updatedProduct) as Product

  return await saveProducts(products)
}

/**
 * Deleta um produto
 */
export async function deleteProduct(id: number): Promise<{ success: boolean; error?: string }> {
  const products = await getProducts()
  const filtered = products.filter(p => p.id !== id)

  if (filtered.length === products.length) {
    return { success: false, error: 'Produto não encontrado' }
  }

  return await saveProducts(filtered)
}
