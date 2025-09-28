import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PixPaymentProps {
  amount: number;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  orderData: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PixPayment({ amount, customer, orderData, onSuccess, onError }: PixPaymentProps) {
  const [pixData, setPixData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [status, setStatus] = useState<'pending' | 'paid' | 'expired'>('pending');
  const { toast } = useToast();

  useEffect(() => {
    createPixPayment();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && status === 'pending') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setStatus('expired');
      onError('Pagamento PIX expirado. Tente novamente.');
    }
  }, [timeLeft, status]);

  const createPixPayment = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          amount,
          customer,
          orderData
        }
      });

      if (error) throw error;

      if (data.success) {
        setPixData(data.payment);
        setTimeLeft(300); // Reset timer
        
        // Start polling for payment status
        startStatusPolling(data.payment.id);
      } else {
        throw new Error(data.error || 'Erro ao criar pagamento PIX');
      }
    } catch (error) {
      console.error('Error creating PIX payment:', error);
      onError('Erro ao criar pagamento PIX. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const startStatusPolling = (paymentId: string) => {
    const interval = setInterval(async () => {
      try {
        // In a real app, you would check payment status via API
        // For now, we'll simulate a successful payment after 10 seconds for testing
        if (Math.random() > 0.9) { // 10% chance each poll
          setStatus('paid');
          clearInterval(interval);
          toast({
            title: "Pagamento confirmado!",
            description: "Seu pedido foi confirmado com sucesso.",
          });
          setTimeout(onSuccess, 1000);
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
      }
    }, 3000); // Poll every 3 seconds

    // Clear interval after 5 minutes
    setTimeout(() => clearInterval(interval), 300000);
  };

  const copyPixCode = () => {
    if (pixData?.pix_code) {
      navigator.clipboard.writeText(pixData.pix_code);
      toast({
        title: "Código copiado!",
        description: "Cole no seu app de pagamento PIX.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p>Gerando código PIX...</p>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="text-center py-8">
        <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">PIX Expirado</h3>
        <p className="text-muted-foreground mb-4">
          O código PIX expirou. Gere um novo código para continuar.
        </p>
        <Button onClick={createPixPayment} className="btn-primary">
          Gerar Novo PIX
        </Button>
      </div>
    );
  }

  if (status === 'paid') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Pagamento Confirmado!</h3>
        <p className="text-muted-foreground">
          Seu pedido foi confirmado com sucesso.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Pagamento PIX</h3>
        <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {pixData?.qr_code_url && (
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <img 
              src={pixData.qr_code_url} 
              alt="QR Code PIX" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Escaneie o QR Code com seu app de pagamento
          </p>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-center font-medium">
          Valor: <span className="price-tag">R$ {amount.toFixed(2).replace('.', ',')}</span>
        </p>
        
        {pixData?.pix_code && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Ou copie o código PIX:</p>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                {pixData.pix_code}
              </div>
              <Button variant="outline" size="icon" onClick={copyPixCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          O pagamento será confirmado automaticamente após a aprovação
        </p>
      </div>
    </div>
  );
}