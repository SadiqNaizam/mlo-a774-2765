import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<HomePage />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
