'use client'

import { useState, useMemo } from 'react'
import { Clock, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { products } from '@/data/products'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Extrai categorias únicas
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category))
    return Array.from(cats).sort()
  }, [])

  // Conta produtos por categoria
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Filtra produtos por categoria
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  // Produtos recentes (últimos 8)
  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            // Mensagem quando não há produtos
            <div className="glass-card rounded-3xl p-12 text-center max-w-2xl mx-auto mt-8">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Nenhum produto cadastrado
              </h2>
              <p className="text-gray-400 mb-6">
                Adicione produtos pelo painel admin ou editando o arquivo{' '}
                <code className="glass rounded-lg px-2 py-1 text-brand-primary">
                  src/data/products.ts
                </code>
              </p>
              <p className="text-sm text-gray-500">
                Acesse o painel: <strong>/admin</strong>
              </p>
            </div>
          ) : (
            <>
              {/* Filtro de Categorias */}
              {categories.length > 0 && (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  productCounts={productCounts}
                />
              )}

              {/* Grid de Produtos Filtrados ou Todos */}
              <section className="mb-12">
                {selectedCategory && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Categoria: <span className="text-brand-primary">{selectedCategory}</span>
                    </h3>
                  </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      Nenhum produto encontrado nesta categoria
                    </p>
                  </div>
                )}
              </section>

              {/* Produtos Recentes */}
              {recentProducts.length > 0 && !selectedCategory && products.length > 8 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-6 h-6 text-brand-accent" />
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      <span className="bg-gradient-to-r from-brand-accent to-brand-hot bg-clip-text text-transparent">
                        Adicionados Recentemente
                      </span>
                    </h2>
                    <Sparkles className="w-5 h-5 text-brand-secondary fill-brand-secondary" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {recentProducts.map((product) => (
                      <ProductCard key={`recent-${product.id}`} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
