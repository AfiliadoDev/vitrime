import { Flame, ShoppingBag, Star, TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-6 px-4 sm:px-6 text-center border-b border-white/5 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Container principal com layout horizontal no desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Lado esquerdo - Logo e título */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Ícone destaque */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative glass rounded-2xl p-3 sm:p-4">
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary icon-shine" />
              </div>
            </div>

            {/* Título compacto */}
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                <span className="text-shine">Promoções Brasil</span>
                <br />
                <span className="text-shine-orange">Imperdíveis</span>
              </h1>
            </div>
          </div>

          {/* Lado direito - Info e badges */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            {/* Subtítulo */}
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-brand-secondary fill-brand-secondary flex-shrink-0" />
              <p className="text-xs sm:text-sm text-white font-semibold">
                Achadinhos, promoções e ofertas que valem a pena 🇧🇷
              </p>
            </div>

            {/* Badges informativos */}
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end">
              <div className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-brand-primary" />
                <span className="text-gray-300 font-medium">Shopee</span>
              </div>
              <div className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-gray-300 font-medium">Ofertas diárias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
