import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { Search, TrendingUp } from 'lucide-react';

// Mock data to simulate fetching suggestions. In a real app, this would come from an API.
const mockSuggestions = [
  'Mechanical Keyboard',
  'Gaming Mouse',
  'Ergonomic Chair',
  '4K Monitor',
  'Wireless Headphones',
  'USB-C Hub',
  'Laptop Stand',
  'Webcam',
  'Microphone',
  'Desk Mat',
];

const SearchBarWithSuggestions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  console.log('SearchBarWithSuggestions loaded');

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = mockSuggestions.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setIsPopoverOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsPopoverOpen(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      console.log(`Navigating to search results for: ${trimmedQuery}`);
      // As per App.tsx, the search route is /search-results
      navigate(`/search-results?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery(''); // Optional: clear input after search
      setIsPopoverOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <div className="w-full max-w-lg mx-auto">
        <PopoverAnchor asChild>
          <form onSubmit={handleFormSubmit} className="relative flex w-full items-center">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search Amazon..."
              className="h-10 w-full rounded-l-md border-r-0 pl-10 focus:ring-0 focus:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-12 rounded-l-none rounded-r-md"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </PopoverAnchor>
        
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] mt-1 p-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{suggestion}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default SearchBarWithSuggestions;