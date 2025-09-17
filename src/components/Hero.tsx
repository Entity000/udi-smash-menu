import { productImages } from '@/data/images';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: `url(${productImages.hero})` }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Os Melhores 
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent block">
              Smash Burgers
            </span>
            da Cidade
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Hambúrgueres artesanais feitos com ingredientes frescos e muito amor
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="#cardapio">
              <Button size="lg" className="btn-secondary text-lg px-8 py-4">
                Ver Cardápio
              </Button>
            </Link>
            <Link to="/sobre">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Sobre Nós
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl mb-2">🔥</div>
              <div className="font-semibold">Smashed na Chapa</div>
              <div className="text-white/80 text-sm">Técnica artesanal</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl mb-2">🥩</div>
              <div className="font-semibold">Carne Premium</div>
              <div className="text-white/80 text-sm">100% bovina</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '1s' }}>
              <div className="text-3xl mb-2">🚚</div>
              <div className="font-semibold">Entrega Rápida</div>
              <div className="text-white/80 text-sm">30-45 minutos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}