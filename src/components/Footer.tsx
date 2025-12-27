import { ShieldCheck, Award, TrendingUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 border-t border-white/5 bg-gradient-to-t from-black/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Badges de Confiança */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {/* Badge Verificado */}
          <div className="glass rounded-2xl px-3 sm:px-6 py-2 sm:py-4 flex items-center gap-2 sm:gap-3 group hover:bg-white/10 transition-all">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 bg-green-500 blur-lg opacity-50 animate-pulse"></div>
              <ShieldCheck className="relative w-6 h-6 sm:w-7 sm:h-7 text-green-400 animate-bounce-slow" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white">Produtos Verificados</p>
              <p className="text-xs text-gray-400">100% Shopee Oficial</p>
            </div>
          </div>

          {/* Badge Qualidade */}
          <div className="glass rounded-2xl px-3 sm:px-6 py-2 sm:py-4 flex items-center gap-2 sm:gap-3 group hover:bg-white/10 transition-all">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 bg-orange-500 blur-lg opacity-50 animate-pulse"></div>
              <Award className="relative w-6 h-6 sm:w-7 sm:h-7 text-orange-400 animate-bounce-slow" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white">Seleção Premium</p>
              <p className="text-xs text-gray-400">Ofertas Validadas</p>
            </div>
          </div>

          {/* Badge Atualizado */}
          <div className="glass rounded-2xl px-3 sm:px-6 py-2 sm:py-4 flex items-center gap-2 sm:gap-3 group hover:bg-white/10 transition-all">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse"></div>
              <TrendingUp className="relative w-6 h-6 sm:w-7 sm:h-7 text-blue-400 animate-bounce-slow" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white">Sempre Atualizado</p>
              <p className="text-xs text-gray-400">Novas ofertas diárias</p>
            </div>
          </div>
        </div>

        {/* Informações e Copyright */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <p className="text-gray-400">
              Parceiro oficial <span className="text-brand-primary font-semibold">Shopee</span>
            </p>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Promoções Brasil Imperdíveis - Todos os direitos reservados
          </p>

          <p className="text-xs text-gray-600">
            Ao clicar em "Comprar", você será redirecionado para a Shopee para concluir sua compra com segurança
          </p>
        </div>
      </div>
    </footer>
  )
}
