import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Small delay for visual feedback
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card-image"
          onError={(e) => {
            e.currentTarget.src = '/api/placeholder/300/200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="price-tag">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
          
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="font-semibold text-sm min-w-[20px] text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className={`btn-primary text-sm px-4 ${isAdding ? 'animate-pulse-glow' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <Plus className="h-3 w-3 mr-1" />
                {isAdding ? 'Adicionando...' : 'Adicionar'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}