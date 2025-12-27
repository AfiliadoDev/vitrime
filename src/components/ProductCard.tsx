'use client'

import { useState } from 'react'
import { Product } from '@/data/products'
import { ShoppingCart, Zap } from 'lucide-react'
import ProductModal from './ProductModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer')
  }

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="glass-card rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl hover:shadow-brand-primary/30 flex flex-col group">
        {/* Imagem do produto */}
        <div
          className="relative aspect-square bg-gradient-to-br from-brand-primary/10 to-conversion-orange/10 overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge de oferta */}
        <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 flex items-center gap-1">
          <Zap className="w-3 h-3 text-brand-secondary fill-brand-secondary" />
          <span className="text-xs font-bold text-white">OFERTA</span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Nome do produto */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Botão de compra - Laranja/Vermelho para máxima conversão */}
        <button
          onClick={handleBuyClick}
          className="relative w-full overflow-hidden rounded-2xl py-3 px-4 font-black text-white text-sm sm:text-base
                     bg-gradient-to-r from-brand-primary to-brand-accent hover:from-conversion-orange-dark hover:to-conversion-red-dark
                     transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]
                     shadow-xl shadow-brand-accent/50 hover:shadow-2xl hover:shadow-brand-accent/70
                     flex items-center justify-center gap-1.5 group/btn
                     border-2 border-brand-primary/30"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="relative z-10">COMPRAR</span>

          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </div>
    </div>

      {/* Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
