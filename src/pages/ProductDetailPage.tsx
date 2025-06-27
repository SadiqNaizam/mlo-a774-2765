import React from 'react';
import { toast } from "sonner";
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import ProductImageGallery from '@/components/ProductImageGallery';
import StarRatingDisplay from '@/components/StarRatingDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, CheckCircle } from 'lucide-react';

// --- Placeholder Data ---
const product = {
  name: "AURA G1 Mechanical Gaming Keyboard",
  price: "129.99",
  rating: 4.7,
  reviewCount: 1342,
  inStock: true,
  shortDescription: "Experience unparalleled speed and precision with the AURA G1. Featuring customizable RGB lighting, tactile mechanical switches, and a durable aluminum frame.",
  images: [
    "https://images.unsplash.com/photo-1618384887196-86c855a80f49?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595225474342-555a11a5f95e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629429408209-1f91296e7ae4?q=80&w=800&auto=format&fit=crop",
  ],
  details: "The AURA G1 is engineered for both competitive gamers and professionals. Its hot-swappable switches allow for complete customization without soldering. The per-key RGB backlighting can be synced with your favorite games.",
  specifications: {
    "Switch Type": "Tactile Brown Mechanical",
    "Layout": "Tenkeyless (87-Key)",
    "Backlighting": "Per-key RGB, 16.8 million colors",
    "Connectivity": "USB-C (detachable)",
    "Frame": "Anodized Aluminum",
    "Keycaps": "Double-shot PBT",
    "Polling Rate": "1000Hz"
  },
};

const reviews = [
  { id: 1, name: "Alex R.", avatar: "AR", rating: 5, comment: "Absolutely love this keyboard. The feel of the keys is perfect for typing and gaming. The RGB is a nice touch!", date: "2 weeks ago" },
  { id: 2, name: "Jenna S.", avatar: "JS", rating: 4, comment: "Solid build quality and great performance. Wish the software was a bit more intuitive, but otherwise fantastic.", date: "1 month ago" },
  { id: 3, name: "Marcus B.", avatar: "MB", rating: 5, comment: "Best TKL keyboard I've ever owned. The PBT keycaps feel premium and the aluminum frame is rock solid. Highly recommend!", date: "3 months ago" },
];
// --- End Placeholder Data ---


const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');
  
  const handleAddToCart = () => {
    toast.success("Item added to cart!", {
      description: `${product.name} is now in your shopping cart.`,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-3">
              <StarRatingDisplay rating={product.rating} />
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">{product.reviewCount} reviews</a>
            </div>

            <p className="text-4xl font-extrabold text-foreground mt-4">${product.price}</p>
            
            <div className="mt-4">
              <Badge variant={product.inStock ? 'default' : 'destructive'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            
            <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-8">
              <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="w-full mt-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  {product.details}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  Free standard shipping on orders over $50. Returns are accepted within 30 days of purchase. Some restrictions may apply.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Lower Section: Tabs for Reviews & Specs */}
        <div id="reviews" className="mt-12 lg:mt-16">
           <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${review.name}`} alt={review.name} />
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{review.name}</p>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <StarRatingDisplay rating={review.rating} size={16} className="mt-1" />
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
               <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-sm">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="font-medium text-muted-foreground">{key}</span>
                        <span className="text-foreground">{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default ProductDetailPage;