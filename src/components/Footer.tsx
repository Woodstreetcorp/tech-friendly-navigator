
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">ApprOVU</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted guide to smart home technology. We help you find the right products and services for your needs.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/recommendations" className="text-sm text-muted-foreground hover:text-primary">Recommendations</Link></li>
              <li><Link to="/partners" className="text-sm text-muted-foreground hover:text-primary">Partners</Link></li>
              <li><Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin Panel</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Email: info@approvu.com</li>
              <li className="text-sm text-muted-foreground">Phone: +1 (800) 123-4567</li>
              <li className="text-sm text-muted-foreground">Address: Toronto, ON</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ApprOVU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
