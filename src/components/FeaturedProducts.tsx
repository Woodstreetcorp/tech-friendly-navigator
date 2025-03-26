
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useUser } from '@/context/UserContext';

// Sample featured products data
const featuredProducts = [
  {
    id: 'prod1',
    name: 'Ring Video Doorbell 4',
    category: 'Security',
    image: '/placeholder.svg',
    rating: 4.7,
    price: 199.99,
    description: 'Advanced security with color video preview and improved motion detection.'
  },
  {
    id: 'prod2',
    name: 'Nest Learning Thermostat',
    category: 'Climate Control',
    image: '/placeholder.svg',
    rating: 4.9,
    price: 249.99,
    description: 'Smart thermostat that learns your schedule and programs itself.'
  },
  {
    id: 'prod3',
    name: 'Philips Hue Starter Kit',
    category: 'Lighting',
    image: '/placeholder.svg',
    rating: 4.5,
    price: 179.99,
    description: 'Smart lighting system with voice control and custom scenes.'
  },
  {
    id: 'prod4',
    name: 'Amazon Echo Show 10',
    category: 'Smart Speakers',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 249.99,
    description: 'Smart display with motion tracking and premium sound.'
  }
];

// Sample featured service providers
const featuredProviders = [
  {
    id: 'prov1',
    name: 'Bell Smart Home',
    category: 'Full Home Solution',
    image: '/placeholder.svg',
    rating: 4.8,
    description: 'Professional installation and monitoring for complete home security.'
  },
  {
    id: 'prov2',
    name: 'Rogers Smart Home Monitoring',
    category: 'Security & Monitoring',
    image: '/placeholder.svg',
    rating: 4.6,
    description: '24/7 professional monitoring and smart home integration.'
  }
];

const FeaturedProducts = () => {
  const { trackEvent } = useUser();

  const handleProductClick = (product: typeof featuredProducts[0]) => {
    trackEvent({
      eventType: 'product_click',
      productId: product.id,
      productName: product.name,
      source: 'featured_products',
      url: window.location.href
    });
  };

  const handleProviderClick = (provider: typeof featuredProviders[0]) => {
    trackEvent({
      eventType: 'provider_click',
      providerId: provider.id,
      providerName: provider.name,
      source: 'featured_providers',
      url: window.location.href
    });
  };
  
  return (
    <div className="space-y-16">
      {/* Featured Products */}
      <div>
        <h3 className="text-2xl font-semibold mb-8">Popular Smart Home Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-32 w-32 object-contain" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium uppercase text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="ml-auto flex items-center text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-semibold ml-1">{product.rating}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${product.price}</span>
                  <Link 
                    to={`/recommendations?product=${product.id}`}
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    <span>View</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Service Providers */}
      <div>
        <h3 className="text-2xl font-semibold mb-8">Top Smart Home Service Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProviders.map(provider => (
            <div 
              key={provider.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover p-6"
              onClick={() => handleProviderClick(provider)}
            >
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={provider.image} alt={provider.name} className="h-10 w-10 object-contain" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-lg">{provider.name}</h4>
                    <div className="flex items-center text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-semibold ml-1">{provider.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium uppercase text-primary/80 bg-primary/10 px-2 py-1 rounded-full mb-2 inline-block">
                    {provider.category}
                  </span>
                  <p className="text-muted-foreground text-sm mb-3">
                    {provider.description}
                  </p>
                  <Link 
                    to={`/recommendations?provider=${provider.id}`}
                    className="text-accent hover:text-accent/80 font-medium flex items-center w-fit"
                  >
                    <span>View Services</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
