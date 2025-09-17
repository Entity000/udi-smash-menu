import { categories, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';

export default function Menu() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section id="cardapio" className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Nosso <span className="text-primary">Cardápio</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore todas as nossas deliciosas opções artesanais
            </p>
          </div>

          {/* Products by Category Sections */}
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryProducts = products.filter(product => product.category === category.id);
              
              return (
                <div key={category.id} className="animate-slide-up">
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-md border border-border/50">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {categoryProducts.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Em breve novos produtos nesta categoria!</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}