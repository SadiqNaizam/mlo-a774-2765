import React from 'react';
import { Link } from 'react-router-dom';
import { Package2, Twitter, Facebook, Instagram } from 'lucide-react';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Get to Know Us */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Get to Know Us</h3>
            <FooterLink to="#">About Us</FooterLink>
            <FooterLink to="#">Careers</FooterLink>
            <FooterLink to="#">Press Releases</FooterLink>
            <FooterLink to="#">EchoCart Science</FooterLink>
          </div>

          {/* Column 2: Make Money with Us */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Make Money with Us</h3>
            <FooterLink to="#">Sell on EchoCart</FooterLink>
            <FooterLink to="#">Sell on EchoCart Business</FooterLink>
            <FooterLink to="#">Sell apps on EchoCart</FooterLink>
            <FooterLink to="#">Become an Affiliate</FooterLink>
            <FooterLink to="#">Advertise Your Products</FooterLink>
          </div>

          {/* Column 3: Payment Products */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Payment Products</h3>
            <FooterLink to="#">EchoCart Business Card</FooterLink>
            <FooterLink to="#">Shop with Points</FooterLink>
            <FooterLink to="#">Reload Your Balance</FooterLink>
            <FooterLink to="#">Gift Cards</FooterLink>
          </div>

          {/* Column 4: Let Us Help You */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Let Us Help You</h3>
            <FooterLink to="/user-dashboard">Your Account</FooterLink>
            <FooterLink to="#">Your Orders</FooterLink>
            <FooterLink to="#">Shipping Rates & Policies</FooterLink>
            <FooterLink to="#">Returns & Replacements</FooterLink>
            <FooterLink to="#">Help</FooterLink>
          </div>
          
          {/* Column 5: Contact */}
          <div className="flex flex-col gap-3 col-span-2 md:col-span-4 lg:col-span-1">
             <h3 className="font-semibold text-foreground">Contact & Social</h3>
             <FooterLink to="#">Contact Us</FooterLink>
             <div className="flex space-x-4 pt-2">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2">
             <Package2 className="h-6 w-6 text-primary" />
             <p className="text-sm text-muted-foreground">
               &copy; {currentYear} EchoCart.com, Inc. or its affiliates
             </p>
           </div>
           <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <FooterLink to="#">Conditions of Use</FooterLink>
              <FooterLink to="#">Privacy Notice</FooterLink>
              <FooterLink to="#">Terms of Service</FooterLink>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;