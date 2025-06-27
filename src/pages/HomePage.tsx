import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import ProductCard from '@/components/ProductCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Sample product data to simulate a backend response
const featuredProducts = [
  {
    id: 'prod_1',
    title: 'High-Performance Mechanical Keyboard with RGB Lighting',
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800',
    price: 129.99,
    rating: 4.8,
    reviewCount: 1845,
  },
  {
    id: 'prod_2',
    title: 'Ultra-Lightweight Wireless Gaming Mouse with Precision Sensor',
    imageUrl: 'https://images.unsplash.com/photo-1615663249854-dcb12ba2f204?q=80&w=800',
    price: 79.50,
    rating: 4.6,
    reviewCount: 2310,
  },
  {
    id: 'prod_3',
    title: '32-inch Curved 4K UHD Monitor for Immersive Visuals',
    imageUrl: 'https://images.unsplash.com/photo-1593344484962-796b16d8a382?q=80&w=800',
    price: 449.00,
    rating: 4.7,
    reviewCount: 987,
  },
  {
    id: 'prod_4',
    title: 'Noise-Cancelling Over-Ear Bluetooth Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800',
    price: 199.99,
    rating: 4.9,
    reviewCount: 12543,
  },
  {
    id: 'prod_5',
    title: 'Ergonomic High-Back Office Chair with Lumbar Support',
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff53822ef?q=80&w=800',
    price: 259.00,
    rating: 4.5,
    reviewCount: 650,
  },
    {
    id: 'prod_6',
    title: 'Portable SSD 1TB - External Solid State Drive',
    imageUrl: 'https://images.unsplash.com/photo-1596798871991-dde7091d374d?q=80&w=800',
    price: 89.99,
    rating: 4.8,
    reviewCount: 4200,
  },
  {
    id: 'prod_7',
    title: 'Smart WiFi 6 Router for High-Speed Connectivity',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800',
    price: 149.99,
    rating: 4.6,
    reviewCount: 1123,
  },
  {
    id: 'prod_8',
    title: 'Professional Condenser Microphone for Streaming & Podcasting',
    imageUrl: 'https://images.unsplash.com/photo-1590602847834-3a25b42072a2?q=80&w=800',
    price: 99.00,
    rating: 4.7,
    reviewCount: 3489,
  },
];

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <AppHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-64 md:h-80 bg-gray-800 text-white flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-40" 
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1740&auto=format&fit=crop')"}}
            ></div>
            <div className="relative z-10 text-center p-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Store for Everything</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Discover deals, find your favorite products, and get them delivered to your door.</p>
                <Link to="/search-results">
                    <Button size="lg" className="mt-8">Shop All Products</Button>
                </Link>
            </div>
        </section>

        {/* Featured Products Section */}
        <section className="container py-12">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                ))}
            </div>
        </section>

        {/* Categories Section - Example */}
        <section className="container pb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold">Electronics</h3>
                </Card>
                <Card className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold">Home & Kitchen</h3>
                </Card>
                <Card className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold">Fashion</h3>
                </Card>
                <Card className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold">Books</h3>
                </Card>
            </div>
        </section>

      </main>

      <AppFooter />
    </div>
  );
};

export default HomePage;