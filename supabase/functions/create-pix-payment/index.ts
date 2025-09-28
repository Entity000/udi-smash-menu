import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, customer, orderData } = await req.json();

    const ghostsPayApiKey = Deno.env.get('GHOSTSPAY_API_KEY');
    if (!ghostsPayApiKey) {
      throw new Error('GhostsPay API key not configured');
    }

    console.log('Creating PIX payment for amount:', amount);
    console.log('Customer data:', customer);

    // Create PIX payment with GhostsPay
    const pixPayload = {
      amount: Math.round(amount * 100), // Convert to cents
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || `${customer.phone}@temp.com`
      },
      description: `Pedido UdiSmash - ${orderData.items.length} itens`,
      external_id: `order_${Date.now()}`,
      expires_in: 300, // 5 minutes
      callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pix-webhook`
    };

    const response = await fetch('https://api.ghostspay.com.br/v1/pix', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghostsPayApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pixPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GhostsPay API error:', errorData);
      throw new Error(`GhostsPay API error: ${response.status}`);
    }

    const pixData = await response.json();
    console.log('PIX payment created successfully:', pixData.id);

    return new Response(JSON.stringify({
      success: true,
      payment: {
        id: pixData.id,
        qr_code: pixData.qr_code,
        qr_code_url: pixData.qr_code_url,
        pix_code: pixData.pix_code,
        amount: pixData.amount / 100, // Convert back to reais
        expires_at: pixData.expires_at,
        status: pixData.status
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-pix-payment function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});