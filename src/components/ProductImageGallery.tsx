import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName = "Product Image" }) => {
  console.log('ProductImageGallery loaded');

  // Initialize state with the first image, or an empty string if the array is empty.
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || '');

  // Effect to update the selected image if the images prop changes (e.g., on data fetch).
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage(''); // Reset if images are cleared.
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg border">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image Available
          </div>
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Display */}
      <div className="overflow-hidden rounded-lg border">
        <AspectRatio ratio={1 / 1}>
          <img
            // Use a placeholder if the selected image is somehow invalid.
            src={selectedImage || 'https://via.placeholder.com/600'}
            alt={`Main view of ${productName}`}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        </AspectRatio>
      </div>

      {/* Thumbnail Gallery - only show if there's more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                selectedImage === image
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
              aria-label={`View image ${index + 1} of ${productName}`}
            >
              <AspectRatio ratio={1 / 1}>
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;