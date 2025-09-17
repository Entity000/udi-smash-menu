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
      <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`category-pill whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id 
                    ? 'category-pill-active' 
                    : 'category-pill-inactive'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <section className="py-8 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Nosso <span className="text-primary">Cardápio</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore todas as nossas deliciosas opções artesanais
            </p>
          </div>

          {/* Products by Category Sections */}
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryProducts = products.filter(product => product.category === category.id);
              
              return (
                <div key={category.id} id={category.id} className="scroll-mt-32">
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-foreground">{category.name}</h3>
                          <p className="text-muted-foreground">
                            {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'itens'} disponíveis
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full w-20"></div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                    <div className="text-center py-8 product-card">
                      <div className="text-4xl mb-4">🚧</div>
                      <p className="text-muted-foreground">Em breve novos produtos nesta categoria!</p>
                    </div>
                  )}

                  {/* Divider (except for last category) */}
                  {category.id !== categories[categories.length - 1].id && (
                    <div className="flex items-center gap-4 mt-8">
                      <div className="flex-1 h-px bg-border"></div>
                      <div className="text-muted-foreground text-sm">•••</div>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 product-card p-8">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco! Estamos sempre criando novos sabores incríveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                📱 WhatsApp
              </Button>
              <Button variant="outline" size="lg">
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
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-gentle"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </div>
  );
}