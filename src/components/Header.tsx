import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🍔 Udi Smash
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Cardápio
            </Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre
            </Link>
            <Link to="/contato" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/carrinho">
              <Button variant="outline" size="icon" className="relative hover:border-primary">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="cart-badge">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}