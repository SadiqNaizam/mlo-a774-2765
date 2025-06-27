import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBarWithSuggestions } from '../SearchBarWithSuggestions';

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');

  // A placeholder for cart items count
  const cartItemCount = 0; 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        
        {/* Logo */}
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">EchoCart</span>
          </Link>
        </div>

        {/* Search Bar - central and expansive */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-xl">
             <SearchBarWithSuggestions />
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <NavLink to="/user-dashboard">
              <Button variant="ghost" className="relative h-8 w-auto px-2 sm:px-4">
                <User className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline-block text-sm">Account</span>
              </Button>
            </NavLink>
            <NavLink to="/shopping-cart">
              <Button variant="ghost" className="relative h-8 w-auto px-2 sm:px-4">
                <ShoppingCart className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline-block text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;