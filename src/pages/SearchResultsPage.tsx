import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import ProductCard from '@/components/ProductCard';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';

// Mock Product Data
const allProducts = [
  { id: 'kb1', title: 'Keychron K2 Wireless Mechanical Keyboard', imageUrl: 'https://images.unsplash.com/photo-1618384887924-c972d35606a2?q=80&w=800', price: 89.99, rating: 4.8, reviewCount: 1250, brand: 'Keychron' },
  { id: 'kb2', title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard', imageUrl: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=800', price: 229.99, rating: 4.6, reviewCount: 3400, brand: 'Razer' },
  { id: 'kb3', title: 'Logitech MX Mechanical Wireless Illuminated Keyboard', imageUrl: 'https://images.unsplash.com/photo-1629429408209-1f91296e7895?q=80&w=800', price: 169.99, rating: 4.7, reviewCount: 2100, brand: 'Logitech' },
  { id: 'kb4', title: 'Corsair K70 RGB MK.2 Mechanical Gaming Keyboard', imageUrl: 'https://images.unsplash.com/photo-1595225476474-875a38378d85?q=80&w=800', price: 159.99, rating: 4.5, reviewCount: 4200, brand: 'Corsair' },
  { id: 'kb5', title: 'Keychron K8 Tenkeyless Wireless Mechanical Keyboard', imageUrl: 'https://images.unsplash.com/photo-1625974136391-12c60ae7f7f3?q=80&w=800', price: 79.99, rating: 4.9, reviewCount: 980, brand: 'Keychron' },
  { id: 'kb6', title: 'Razer Huntsman Mini 60% Gaming Keyboard', imageUrl: 'https://images.unsplash.com/photo-1633008812674-67941c5a77f5?q=80&w=800', price: 119.99, rating: 4.4, reviewCount: 5600, brand: 'Razer' },
  { id: 'kb7', title: 'Logitech G PRO Mechanical Gaming Keyboard', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800', price: 129.99, rating: 4.6, reviewCount: 3150, brand: 'Logitech' },
  { id: 'kb8', title: 'Corsair K100 AIR Wireless RGB Ultra-Thin Keyboard', imageUrl: 'https://images.unsplash.com/photo-1598135119131-a0a324021275?q=80&w=800', price: 279.99, rating: 4.3, reviewCount: 890, brand: 'Corsair' },
];

const ITEMS_PER_PAGE = 4;
const BRANDS = ['Keychron', 'Razer', 'Logitech', 'Corsair'];

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'mechanical keyboard';

  const [sortOrder, setSortOrder] = useState('relevance');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log('SearchResultsPage loaded');

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts]; // In a real app, this would be fetched based on the query

    // Filter by brand
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }

    // Sort products
    switch (sortOrder) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'relevance'
        break;
    }

    return products;
  }, [selectedBrands, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // Reset filters and page when search query changes
    setSelectedBrands([]);
    setSortOrder('relevance');
    setCurrentPage(1);
  }, [query]);
  
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
            <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedProducts.length} results for <span className="text-primary font-semibold">"{query}"</span>
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar for Filters & Sorting */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Sort by</h4>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating-desc">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3">Brand</h4>
                  <div className="space-y-2">
                    {BRANDS.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="cursor-pointer">{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Product Grid */}
          <section className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedProducts.map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                     {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}/>
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>{i + 1}</PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}/>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold">No products found</h2>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search for something else.</p>
                </div>
            )}
          </section>
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default SearchResultsPage;