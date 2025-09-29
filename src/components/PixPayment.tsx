import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface PixPaymentProps {
  amount: number;
  customer: {
    name: string;
    phone: string;
    document?: string;
    email?: string;
  };
  orderData: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PixPayment({ amount, customer, orderData, onSuccess, onError }: PixPaymentProps) {
  const [pixData, setPixData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [status, setStatus] = useState<'pending' | 'paid' | 'expired'>('pending');
  const [checking, setChecking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    createPixPayment();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && status === 'pending') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setStatus('expired');
      toast({
        title: "PIX Expirado",
        description: "O tempo para pagamento expirou. Voltando ao cardápio...",
        variant: "destructive"
      });
      setTimeout(() => navigate('/'), 2000);
    }
  }, [timeLeft, status, navigate, toast]);

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
        setTimeLeft(600); // Reset timer to 10 minutes
        
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

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      setChecking(true);
      const { data, error } = await supabase.functions.invoke('check-pix-status', {
        body: { paymentId }
      });

      if (error) throw error;

      if (data.success && data.status === 'paid') {
        setStatus('paid');
        toast({
          title: "Pagamento confirmado!",
          description: "Seu pedido foi confirmado com sucesso.",
        });
        setTimeout(onSuccess, 1000);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    } finally {
      setChecking(false);
    }
  };

  const startStatusPolling = (paymentId: string) => {
    const interval = setInterval(async () => {
      const isPaid = await checkPaymentStatus(paymentId);
      if (isPaid) {
        clearInterval(interval);
      }
    }, 5000); // Poll every 5 seconds

    // Clear interval after 10 minutes
    setTimeout(() => clearInterval(interval), 600000);
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
          Redirecionando para o cardápio...
        </p>
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

      <div className="space-y-3">
        <Button 
          onClick={() => pixData?.id && checkPaymentStatus(pixData.id)}
          disabled={checking}
          className="w-full btn-primary"
          size="lg"
        >
          {checking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Verificando...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Verificar Pagamento
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          O pagamento também será confirmado automaticamente
        </p>
      </div>
    </div>
  );
}