import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Ingredientes padrão para hambúrgueres
const defaultIngredients = [
  { id: 'alface', name: 'Alface', removable: true },
  { id: 'tomate', name: 'Tomate', removable: true },
  { id: 'cebola', name: 'Cebola', removable: true },
  { id: 'queijo', name: 'Queijo Cheddar', removable: false },
  { id: 'molho', name: 'Molho Especial', removable: true },
];

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const isBurger = product.category === 'burgers';
  const totalPrice = product.price * quantity;

  const handleIngredientToggle = (ingredientId: string) => {
    setRemovedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    
    setTimeout(() => {
      setIsAdding(false);
      onClose();
      setQuantity(1);
      setRemovedIngredients([]);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Imagem do produto */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/400/300';
              }}
            />
          </div>

          {/* Descrição */}
          <div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Opções de ingredientes (apenas para hambúrgueres) */}
          {isBurger && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personalize seu hambúrguer</h3>
              <p className="text-sm text-muted-foreground">
                Remova os ingredientes que você não quer:
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {defaultIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={ingredient.id}
                      checked={!removedIngredients.includes(ingredient.id)}
                      onCheckedChange={() => {
                        if (ingredient.removable) {
                          handleIngredientToggle(ingredient.id);
                        }
                      }}
                      disabled={!ingredient.removable}
                    />
                    <label 
                      htmlFor={ingredient.id} 
                      className={`text-sm ${!ingredient.removable ? 'text-muted-foreground' : 'cursor-pointer'}`}
                    >
                      {ingredient.name}
                      {!ingredient.removable && (
                        <span className="text-xs ml-2 text-primary">(obrigatório)</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantidade e preço */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantidade:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="font-semibold text-lg min-w-[30px] text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </div>
              {quantity > 1 && (
                <div className="text-sm text-muted-foreground">
                  R$ {product.price.toFixed(2).replace('.', ',')} cada
                </div>
              )}
            </div>
          </div>

          {/* Botão adicionar ao carrinho */}
          <Button 
            className="w-full h-12 text-lg font-semibold"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                Adicionando...
              </div>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" />
                Adicionar ao carrinho - R$ {totalPrice.toFixed(2).replace('.', ',')}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}