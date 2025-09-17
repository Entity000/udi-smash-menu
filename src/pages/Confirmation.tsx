import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  const { orderData, orderId } = location.state || {};

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">❌</div>
            <h1 className="text-3xl font-bold mb-4">Pedido não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              Não foi possível encontrar os dados do seu pedido.
            </p>
            <Link to="/">
              <Button size="lg" className="btn-primary">
                Voltar ao Cardápio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethodLabels = {
    credit: 'Cartão de Crédito',
    debit: 'Cartão de Débito',
    pix: 'PIX',
    cash: 'Dinheiro na Entrega'
  };

  return (
    <div className="min-h-screen bg-gradient-warm py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce-gentle">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Pedido Confirmado! 🎉
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              Obrigado pela preferência, <strong>{orderData.name}</strong>!
            </p>
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
              <span>Pedido #{orderId}</span>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="product-card p-6 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold mb-2">Pedido Recebido</h3>
              <p className="text-sm text-muted-foreground">Confirmado agora</p>
            </div>
            
            <div className="product-card p-6 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl mb-3">👨‍🍳</div>
              <h3 className="font-semibold mb-2">Preparando</h3>
              <p className="text-sm text-muted-foreground">Em breve</p>
            </div>
            
            <div className="product-card p-6 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl mb-3">🏍️</div>
              <h3 className="font-semibold mb-2">Em Entrega</h3>
              <p className="text-sm text-muted-foreground">30-45 min</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Info */}
            <div className="product-card p-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Detalhes da Entrega
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Contato</p>
                    <p className="text-muted-foreground">{orderData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-muted-foreground">{orderData.address}</p>
                    {orderData.complement && (
                      <p className="text-muted-foreground text-sm">{orderData.complement}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tempo estimado</p>
                    <p className="text-muted-foreground">30-45 minutos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="product-card p-6 animate-slide-up" style={{ animationDelay: '1s' }}>
              <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-6">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-sm">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-sm font-medium">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="price-tag text-xl">
                      R$ {orderData.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Forma de pagamento:</span>
                    <span className="font-medium">
                      {paymentMethodLabels[orderData.paymentMethod as keyof typeof paymentMethodLabels]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <div className="product-card p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Acompanhe seu pedido</p>
                    <p className="text-sm text-muted-foreground">
                      Você receberá atualizações no WhatsApp
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Prepare-se para receber</p>
                    <p className="text-sm text-muted-foreground">
                      Tenha o pagamento em mãos se escolheu dinheiro
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="btn-primary">
                  Fazer Novo Pedido
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" onClick={() => window.print()}>
                Imprimir Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}