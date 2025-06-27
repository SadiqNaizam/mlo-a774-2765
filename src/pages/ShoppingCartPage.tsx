import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Icons
import { Trash2, ShoppingCart } from 'lucide-react';

// Define the structure for a cart item
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

// Placeholder data to simulate a populated cart
const initialCartItems: CartItem[] = [
  {
    id: 'prod1',
    name: 'High-Performance Mechanical Keyboard',
    image: 'https://placehold.co/100x100/e2e8f0/334155?text=Keyboard',
    price: 129.99,
    quantity: 1,
    stock: 10,
  },
  {
    id: 'prod2',
    name: 'Ergonomic Wireless Mouse',
    image: 'https://placehold.co/100x100/e2e8f0/334155?text=Mouse',
    price: 79.50,
    quantity: 1,
    stock: 5,
  },
  {
    id: 'prod3',
    name: '4K Ultra-HD Monitor 27-inch',
    image: 'https://placehold.co/100x100/e2e8f0/334155?text=Monitor',
    price: 349.00,
    quantity: 2,
    stock: 8,
  },
];

const ShoppingCartPage: React.FC = () => {
  console.log('ShoppingCartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Handlers for cart actions
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal, re-computing only when cartItems changes
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);
  
  // Simulate checkout process
  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    alert("Checkout functionality is a simulation. You will be redirected to the homepage.");
    navigate('/'); // Navigate to home as no checkout page exists
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[5%]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                              <div>
                                <Link to="/product-detail" className="font-medium hover:text-primary">
                                  {item.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">In Stock</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping (est.)</span>
                    <span>$5.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(subtotal + 5.00).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          // Empty Cart View
          <Card className="text-center py-20">
            <CardContent className="flex flex-col items-center gap-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
              <Button asChild className="mt-4">
                <Link to="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <AppFooter />
    </div>
  );
};

export default ShoppingCartPage;