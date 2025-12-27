'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/data/products'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isNewProduct, setIsNewProduct] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    affiliateLink: '',
    category: ''
  })

  // Categorias sugeridas
  const suggestedCategories = [
    'Cozinha',
    'Quarto',
    'Sala',
    'Banheiro',
    'Eletrônicos',
    'Moda',
    'Beleza',
    'Esportes',
    'Pet Shop',
    'Decoração',
    'Ferramentas',
    'Bebês'
  ]

  // Verifica autenticação
  useEffect(() => {
    checkAuth()
  }, [])

  // Carrega produtos quando autenticado
  useEffect(() => {
    if (authenticated) {
      loadProducts()
    }
  }, [authenticated])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      setAuthenticated(data.authenticated)
    } catch {
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      })

      const data = await res.json()

      if (data.success) {
        setAuthenticated(true)
        setPin('')
      } else {
        setError(data.error || 'PIN inválido')
        if (data.remainingAttempts !== undefined) {
          setError(`${data.error}. Tentativas restantes: ${data.remainingAttempts}`)
        }
      }
    } catch {
      setError('Erro ao fazer login')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAuthenticated(false)
      setProducts([])
    } catch {
      setError('Erro ao fazer logout')
    }
  }

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch {
      setError('Erro ao carregar produtos')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsNewProduct(false)
    setFormData({
      name: product.name,
      description: product.description,
      image: product.image,
      affiliateLink: product.affiliateLink,
      category: product.category
    })
  }

  const handleNew = () => {
    setEditingProduct(null)
    setIsNewProduct(true)
    setFormData({
      name: '',
      description: '',
      image: '',
      affiliateLink: '',
      category: ''
    })
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setIsNewProduct(false)
    setFormData({
      name: '',
      description: '',
      image: '',
      affiliateLink: '',
      category: ''
    })
    setError('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      let res

      if (isNewProduct) {
        // Criar novo produto
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            images: []
          })
        })
      } else {
        // Atualizar produto existente
        res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct?.id,
            ...formData,
            images: editingProduct?.images || [],
            createdAt: editingProduct?.createdAt || new Date().toISOString()
          })
        })
      }

      const data = await res.json()

      if (data.success) {
        await loadProducts()
        handleCancel()
      } else {
        setError(data.error || 'Erro ao salvar produto')
      }
    } catch {
      setError('Erro ao salvar produto')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
      return
    }

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if (data.success) {
        await loadProducts()
      } else {
        setError(data.error || 'Erro ao deletar produto')
      }
    } catch {
      setError('Erro ao deletar produto')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 Painel Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Digite o PIN de acesso
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full glass rounded-2xl px-4 py-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                maxLength={8}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="glass rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full glass rounded-2xl py-3 px-4 font-bold text-white
                         bg-gradient-to-r from-brand-primary to-brand-accent hover:from-conversion-orange-dark hover:to-conversion-red-dark
                         transition-all duration-300 transform hover:scale-[1.02]
                         shadow-lg shadow-brand-accent/40"
            >
              ENTRAR
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Protegido por:</p>
            <ul className="mt-2 space-y-1">
              <li>✓ Rate limiting (máx 5 tentativas)</li>
              <li>✓ Proteção contra timing attacks</li>
              <li>✓ Sessão JWT segura</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-3xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Painel Admin
            </h1>
            <p className="text-sm text-gray-400">
              Gerencie seus produtos afiliados
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="glass rounded-xl px-4 py-2 text-white hover:bg-red-500/20 transition-colors"
          >
            Sair
          </button>
        </div>

        {error && (
          <div className="glass-card rounded-2xl p-4 mb-6 text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Form de edição/criação */}
        {(editingProduct || isNewProduct) && (
          <div className="glass-card rounded-3xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {isNewProduct ? 'Novo Produto' : 'Editar Produto'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={3}
                  required
                  maxLength={200}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  URL da Imagem (Shopee)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://cf.shopee.com.br/file/..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Clique com botão direito na imagem da Shopee → Copiar endereço da imagem
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Link de Afiliado
                </label>
                <input
                  type="url"
                  value={formData.affiliateLink}
                  onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://shope.ee/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Digite ou selecione abaixo"
                  required
                  list="category-suggestions"
                  maxLength={50}
                />
                <datalist id="category-suggestions">
                  {suggestedCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedCategories.slice(0, 6).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className="text-xs glass rounded-full px-3 py-1 text-gray-300 hover:text-white hover:bg-brand-primary/20 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Clique em uma sugestão ou digite uma nova categoria
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 glass rounded-xl py-3 font-semibold text-white
                             bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500
                             transition-all"
                >
                  SALVAR
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 glass rounded-xl py-3 font-semibold text-white
                             hover:bg-gray-500/20 transition-all"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de produtos */}
        {!editingProduct && !isNewProduct && (
          <>
            <div className="mb-6">
              <button
                onClick={handleNew}
                className="glass rounded-2xl px-6 py-3 font-bold text-white
                           bg-gradient-to-r from-brand-primary to-brand-accent hover:from-conversion-orange-dark hover:to-conversion-red-dark
                           transition-all shadow-lg shadow-brand-accent/40 hover:scale-[1.02]"
              >
                + NOVO PRODUTO
              </button>
            </div>

            {products.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400">
                  Nenhum produto cadastrado. Clique em "NOVO PRODUTO" para começar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="glass-card rounded-2xl p-4 flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {product.description}
                      </p>
                      <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Ver link de afiliado →
                      </a>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="glass rounded-lg px-4 py-2 text-sm text-white hover:bg-blue-500/20 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="glass rounded-lg px-4 py-2 text-sm text-white hover:bg-red-500/20 transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
