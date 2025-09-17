import { useState } from 'react';
import { categories, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('burgers');

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section id="cardapio" className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Nosso <span className="text-primary">Cardápio</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Escolha entre nossas deliciosas opções artesanais
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-pill ${
                  selectedCategory === category.id 
                    ? 'category-pill-active' 
                    : 'category-pill-inactive'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="animate-slide-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🍽️</div>
              <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}