import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PixPayment from '@/components/PixPayment';

interface CheckoutForm {
  name: string;
  phone: string;
  document: string;
  address: string;
  complement: string;
  paymentMethod: 'pix';
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    document: '',
    address: '',
    complement: '',
    paymentMethod: 'pix'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPixPayment, setShowPixPayment] = useState(false);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.document || !form.address) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setShowPixPayment(true);
  };

  const handlePixSuccess = () => {
    clearCart();
    navigate('/confirmacao', {
      state: { 
        orderData: { ...form, items, total },
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentMethod: 'pix'
      }
    });
  };

  const handlePixError = (error: string) => {
    toast({
      title: "Erro no pagamento PIX",
      description: error,
      variant: "destructive"
    });
    setShowPixPayment(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Carrinho vazio</h1>
            <p className="text-muted-foreground mb-8">
              Adicione alguns itens ao carrinho antes de finalizar o pedido.
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
            <Link to="/carrinho">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dados Pessoais */}
                <div className="product-card p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Dados Pessoais
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="document">CPF *</Label>
                      <Input
                        id="document"
                        value={form.document}
                        onChange={(e) => handleInputChange('document', e.target.value)}
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço de Entrega */}
                <div className="product-card p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Endereço de Entrega
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Endereço Completo *</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Rua, número, bairro, cidade"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={form.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        placeholder="Apartamento, bloco, referência..."
                      />
                    </div>
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div className="product-card p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Forma de Pagamento
                  </h3>
                  
                  <div className="flex items-center gap-3 p-4 border-2 border-primary bg-primary/5 rounded-lg">
                    <span className="text-2xl">📱</span>
                    <span className="font-medium">PIX</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="product-card p-6">
                  {showPixPayment ? (
                    <PixPayment
                      amount={total}
                      customer={{
                        name: form.name,
                        phone: form.phone,
                        document: form.document
                      }}
                      orderData={{ ...form, items, total }}
                      onSuccess={handlePixSuccess}
                      onError={handlePixError}
                    />
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>
                      
                      <div className="space-y-3 mb-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                          </div>
                        ))}
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span className="price-tag text-xl">
                              R$ {total.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        size="lg" 
                        className="w-full btn-primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Processando...
                          </div>
                        ) : (
                          'Gerar PIX'
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Tempo estimado de entrega: 30-45 minutos
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}