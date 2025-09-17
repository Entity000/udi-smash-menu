import heroImage from '@/assets/hero-banner-new.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse-glow"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/25 rounded-full blur-lg animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-block mb-6 animate-slide-up">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                🔥 Hamburgueria Artesanal Premium
              </span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 mb-8">
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                SMASH
                <span className="block bg-gradient-to-r from-secondary via-accent to-secondary-glow bg-clip-text text-transparent animate-pulse-glow">
                  BURGERS
                </span>
              </h1>
              <p className="text-xl lg:text-3xl font-bold text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Explosão de Sabor em Cada Mordida
              </p>
            </div>
            
            <p className="text-lg lg:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Experimente nossos hambúrgueres artesanais preparados com a técnica smash, ingredientes premium e muito amor
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="#cardapio">
                <Button size="lg" className="btn-secondary text-xl px-10 py-5 h-auto shadow-glow hover:shadow-lg transform hover:scale-105 transition-all">
                  🍔 Ver Cardápio
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-2 border-white/30 hover:bg-white/20 hover:border-white backdrop-blur-sm text-xl px-10 py-5 h-auto transform hover:scale-105 transition-all">
                📱 Peça Agora
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-glow">
                🔥
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Técnica Smash</h3>
              <p className="text-white/70">Smashed na chapa quente para máximo sabor e crocância</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-glow">
                🥩
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Carne Premium</h3>
              <p className="text-white/70">Blend especial 100% bovino selecionado diariamente</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-glow rounded-full flex items-center justify-center text-3xl mb-4 mx-auto shadow-glow">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Super Rápido</h3>
              <p className="text-white/70">Entrega expressa em 25-35 minutos na sua casa</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-secondary mb-2">500+</div>
              <div className="text-white/70 text-sm lg:text-base">Clientes Felizes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-accent mb-2">4.9★</div>
              <div className="text-white/70 text-sm lg:text-base">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-secondary mb-2">25min</div>
              <div className="text-white/70 text-sm lg:text-base">Entrega Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-accent mb-2">100%</div>
              <div className="text-white/70 text-sm lg:text-base">Ingredientes Frescos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}