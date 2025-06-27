import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import StarRatingDisplay from '@/components/StarRatingDisplay'; // Assuming this component exists

import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  imageUrl,
  price,
  rating,
  reviewCount,
}) => {
  const { toast } = useToast();
  console.log('ProductCard loaded for:', title);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if button is inside a link
    e.stopPropagation(); // Stop event from bubbling up to the card's link
    
    toast({
      title: "Added to cart",
      description: `${title} has been successfully added to your cart.`,
    });
    console.log(`Product ${id} added to cart.`);
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link to="/product-detail" state={{ productId: id }} className="block">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl || "https://via.placeholder.com/300x225"}
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Link>

      <CardContent className="p-4 flex-grow flex flex-col space-y-2">
        <h3 className="font-semibold text-base leading-snug h-12 line-clamp-2">
          <Link to="/product-detail" state={{ productId: id }} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StarRatingDisplay rating={rating} />
          <span>({reviewCount.toLocaleString()})</span>
        </div>

        <div className="pt-2">
          <span className="text-2xl font-bold">
            {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-3 border-t mt-auto">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;