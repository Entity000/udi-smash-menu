import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { upsellOffers } from '@/data/products';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleUpsellToggle = (upsellId: string) => {
    setSelectedUpsells(prev => 
      prev.includes(upsellId) 
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    );
  };

  const upsellTotal = selectedUpsells.reduce((sum, upsellId) => {
    const offer = upsellOffers.find(o => o.id === upsellId);
    return sum + (offer?.price || 0);
  }, 0);

  const finalTotal = total + upsellTotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Que tal dar uma olhada no nosso delicioso cardápio?
            </p>
            <Link to="/">
              <Button size="lg" className="btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver Cardápio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Seu Carrinho</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="product-card p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image || '/api/placeholder/80/80'} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/80/80';
                        }}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="price-tag">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="font-semibold min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upsell Section */}
              {items.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">
                    Que tal complementar seu pedido? 🤤
                  </h3>
                  
                  <div className="space-y-4">
                    {upsellOffers.map((offer) => (
                      <div 
                        key={offer.id} 
                        className={`upsell-card cursor-pointer ${
                          selectedUpsells.includes(offer.id) ? 'border-secondary bg-secondary/5' : ''
                        }`}
                        onClick={() => handleUpsellToggle(offer.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{offer.title}</h4>
                            <p className="text-muted-foreground text-sm">{offer.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="price-tag">
                                R$ {offer.price.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-muted-foreground line-through text-sm">
                                R$ {offer.originalPrice.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          </div>
                          
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedUpsells.includes(offer.id) 
                              ? 'bg-secondary border-secondary' 
                              : 'border-muted-foreground'
                          }`}>
                            {selectedUpsells.includes(offer.id) && (
                              <div className="w-3 h-3 bg-secondary-foreground rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="product-card p-6">
                  <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    {selectedUpsells.length > 0 && (
                      <div className="flex justify-between text-secondary">
                        <span>Extras</span>
                        <span>+ R$ {upsellTotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="price-tag text-xl">
                          R$ {finalTotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full btn-primary"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Pedido
                  </Button>
                  
                  <Link to="/" className="block mt-4">
                    <Button variant="outline" size="lg" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}