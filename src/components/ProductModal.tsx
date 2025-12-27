'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck } from 'lucide-react'
import { Product } from '@/data/products'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Múltiplas imagens - usa imagens adicionais se existirem, senão usa só a principal
  const images = product.images && product.images.length > 0
    ? [product.image, ...product.images]
    : [product.image]

  // Reseta o índice quando abre o modal
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      document.body.style.overflow = 'hidden' // Bloqueia scroll do body
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-brand-accent hover:bg-brand-hot rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white font-bold" strokeWidth={3} />
          </button>

          <div className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8">
            {/* Galeria de Imagens - Esquerda */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Imagem Principal */}
              <div className="relative aspect-square bg-gradient-to-br from-brand-primary/10 to-conversion-orange/10 rounded-2xl overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={`${product.name} - Imagem ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Controles do Slide */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/20 transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/20 transition-colors"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-brand-primary w-8'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Ir para imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? 'ring-2 ring-brand-primary'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto - Direita */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Nome */}
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {product.name}
              </h2>

              {/* Badge Validado */}
              <div className="flex items-center gap-2 glass rounded-xl p-3">
                <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">Produto validado</strong> dentro da Shopee
                </p>
              </div>

              {/* Descrição */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Sobre o produto</h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Categoria */}
              <div className="glass rounded-xl p-3">
                <p className="text-sm text-gray-400">
                  Categoria: <span className="text-brand-primary font-semibold">{product.category}</span>
                </p>
              </div>

              {/* Botão de Compra */}
              <div className="relative mt-auto">
                {/* Borda animada */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-hot rounded-2xl blur opacity-75 animate-pulse"></div>

                <button
                  onClick={handleBuyClick}
                  className="relative w-full overflow-hidden rounded-2xl py-4 px-6 font-bold text-white text-lg
                             bg-gradient-to-r from-brand-primary to-brand-accent hover:from-emerald-600 hover:to-green-500
                             transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]
                             shadow-xl shadow-brand-primary/40 hover:shadow-2xl hover:shadow-brand-primary/60
                             flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="relative z-10">COMPRAR NA SHOPEE</span>

                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>

              {/* Info adicional */}
              <p className="text-xs text-center text-gray-500">
                Você será redirecionado para a Shopee para concluir a compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
