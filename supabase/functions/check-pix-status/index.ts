import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { paymentId } = await req.json();

    if (!paymentId) {
      throw new Error('Payment ID is required');
    }

    console.log('Checking PIX payment status for ID:', paymentId);

    const response = await fetch(`https://api.ghostspaysv2.com/functions/v1/transactions/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic c2tfbGl2ZV9rajFubmJ6akhKZ3F4ZVNxYXgzbkVOM1daS0lHWUJsU3RkYXBVOXZjY2VqOVlRcWg6ZGRlZGVkNTUtMzk5YS00OGFiLTkwYzAtNTIzYzVjZDZjNGJk',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GhostsPay API error:', errorData);
      throw new Error(`GhostsPay API error: ${response.status}`);
    }

    const paymentData = await response.json();
    console.log('Payment status:', paymentData.status);

    return new Response(JSON.stringify({
      success: true,
      status: paymentData.status,
      paidAt: paymentData.paidAt
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error checking PIX payment status:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
