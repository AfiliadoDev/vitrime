'use client'

import { Package2 } from 'lucide-react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  productCounts: Record<string, number>
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  productCounts
}: CategoryFilterProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Package2 className="w-6 h-6 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-brand-primary flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-bold text-white">Categorias</h2>
      </div>

      <div className="flex gap-2 flex-wrap">
        {/* Botão "Todos" */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`
            px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
            ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-accent/40'
                : 'glass text-gray-300 hover:text-white hover:bg-white/10'
            }
          `}
        >
          Todos ({productCounts['all'] || 0})
        </button>

        {/* Botões de categorias */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-accent/40'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {category} ({productCounts[category] || 0})
          </button>
        ))}
      </div>
    </div>
  )
}
