import { useEffect, useState } from 'react';
import { categories, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll spy para detectar seção ativa
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botão voltar ao topo
      setShowBackToTop(window.scrollY > 500);

      // Detectar seção ativa
      const sections = categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200; // Offset para melhor detecção

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll suave para categoria
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 120; // Compensar header sticky
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Sticky Category Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`category-pill whitespace-nowrap flex-shrink-0 min-w-fit ${
                  activeCategory === category.id 
                    ? 'category-pill-active' 
                    : 'category-pill-inactive'
                }`}
              >
                <span className="mr-1.5 sm:mr-2 text-lg sm:text-xl">{category.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <section className="py-4 sm:py-8 bg-gradient-warm">
        <div className="px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
              Nosso <span className="text-primary">Cardápio</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg px-4">
              Explore todas as nossas deliciosas opções artesanais
            </p>
          </div>

          {/* Products by Category Sections */}
          <div className="space-y-8 sm:space-y-12">
            {categories.map((category) => {
              const categoryProducts = products.filter(product => product.category === category.id);
              
              return (
                <div key={category.id} id={category.id} className="scroll-mt-20 sm:scroll-mt-32">
                  {/* Category Header */}
                  <div className="mb-4 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg sm:text-2xl">{category.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-foreground">{category.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'itens'} disponíveis
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-0.5 sm:h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full w-16 sm:w-20"></div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    {categoryProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {categoryProducts.length === 0 && (
                    <div className="text-center py-6 sm:py-8 product-card">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚧</div>
                      <p className="text-muted-foreground text-sm sm:text-base">Em breve novos produtos nesta categoria!</p>
                    </div>
                  )}

                  {/* Divider (except for last category) */}
                  {category.id !== categories[categories.length - 1].id && (
                    <div className="flex items-center gap-4 mt-6 sm:mt-8">
                      <div className="flex-1 h-px bg-border"></div>
                      <div className="text-muted-foreground text-xs sm:text-sm">•••</div>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 sm:mt-16 product-card p-4 sm:p-8 mx-2 sm:mx-0">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛒</div>
            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Entre em contato conosco! Estamos sempre criando novos sabores incríveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="btn-secondary text-sm sm:text-base">
                📱 WhatsApp
              </Button>
              <Button variant="outline" size="lg" className="text-sm sm:text-base">
                📧 E-mail
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-gentle"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
        </button>
      )}
    </div>
  );
}