
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard, { Product } from '../components/ProductCard';
import { RecommendationResult, productData, serviceProviders } from '../utils/recommendationEngine';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';
import UserInfoForm from '../components/UserInfoForm';
import { Button } from '@/components/ui/button';

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 2000],
    brand: 'all',
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showProviderForm, setShowProviderForm] = useState<string | null>(null);
  
  const { trackEvent, isUserDataCollected } = useUser();
  
  // Categories derived from product data
  const categories = ['all', ...new Set(productData.map(p => p.category.toLowerCase()))];
  
  // Brands derived from product data
  const brands = ['all', ...new Set(productData.map(p => p.brand.toLowerCase()))];
  
  useEffect(() => {
    // Try to load recommendations from localStorage
    const savedRecommendations = localStorage.getItem('smartHomeRecommendations');
    
    if (savedRecommendations) {
      try {
        const parsed = JSON.parse(savedRecommendations);
        setRecommendations(parsed);
        setFilteredProducts(parsed.products);
        
        // Track page view with recommendations loaded
        trackEvent({
          eventType: 'recommendations_page_view',
          source: 'recommendations_page',
        });
      } catch (e) {
        console.error('Error parsing saved recommendations', e);
        // Fallback to all products
        setFilteredProducts(productData);
        toast.error("We couldn't load your personalized recommendations. Showing all products instead.");
      }
    } else {
      // No recommendations found, use all products
      setFilteredProducts(productData);
    }
    
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (!recommendations) return;
    
    // Apply filters to the recommendations
    let filtered = [...recommendations.products];
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === filters.category
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Filter by brand
    if (filters.brand !== 'all') {
      filtered = filtered.filter(p => 
        p.brand.toLowerCase() === filters.brand
      );
    }
    
    setFilteredProducts(filtered);
  }, [filters, recommendations]);
  
  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleFilterSection = () => {
    setShowFilters(prev => !prev);
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const startNewQuiz = () => {
    navigate('/');
    // Small delay to let the navigation happen
    setTimeout(() => {
      const startButton = document.querySelector('button:contains("Start Your Personalized Quiz")');
      if (startButton) {
        (startButton as HTMLButtonElement).click();
      }
    }, 500);
  };
  
  const handleProviderClick = (providerId: string, providerName: string, website: string) => {
    // Track the provider click
    trackEvent({
      eventType: 'provider_click',
      providerId,
      providerName,
      url: website,
    });
    
    // If user data already collected, proceed to provider website
    if (isUserDataCollected) {
      window.open(website, '_blank');
    } else {
      // Show user form for this provider
      setShowProviderForm(providerId);
    }
  };
  
  const handleProviderFormComplete = (providerId: string) => {
    const provider = recommendations?.serviceProviders.find(p => p.id === providerId);
    setShowProviderForm(null);
    
    // Provider website will be opened by the form component
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading your recommendations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Back link */}
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Home</span>
          </button>
          
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Smart Home Recommendations</h1>
            <p className="text-lg text-muted-foreground">
              {recommendations ? 'Based on your preferences, we recommend these smart home solutions.' : 'Browse our selection of smart home products and services.'}
            </p>
            
            {/* New prominent CTA */}
            {recommendations && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">Not finding what you're looking for?</h3>
                    <p className="text-muted-foreground">Take our quiz again to get more tailored recommendations.</p>
                  </div>
                  <Button 
                    onClick={startNewQuiz}
                    className="whitespace-nowrap"
                  >
                    Start New Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Filter button (mobile) */}
          <div className="lg:hidden mb-6">
            <button 
              onClick={toggleFilterSection}
              className="w-full py-3 px-4 bg-secondary rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                <span>Filters</span>
              </span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="glass-card p-6 space-y-6 sticky top-24">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button 
                    className="text-primary text-sm hover:underline"
                    onClick={() => {
                      setFilters({
                        category: 'all',
                        priceRange: [0, 2000],
                        brand: 'all',
                      });
                    }}
                  >
                    Reset All
                  </button>
                </div>
                
                {/* Category filter */}
                <div className="space-y-3">
                  <button 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('category')}
                  >
                    <h4 className="font-medium">Category</h4>
                    {expandedSection === 'category' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {expandedSection === 'category' && (
                    <div className="space-y-2 pt-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <button
                            onClick={() => handleFilterChange('category', category)}
                            className="flex items-center"
                          >
                            <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center mr-2 border ${
                              filters.category === category ? 'bg-primary border-primary text-white' : 'border-muted-foreground/30'
                            }`}>
                              {filters.category === category && <Check size={12} />}
                            </span>
                            <span className="capitalize">
                              {category === 'all' ? 'All Categories' : category.replace('-', ' ')}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Price filter */}
                <div className="space-y-3">
                  <button 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('price')}
                  >
                    <h4 className="font-medium">Price Range</h4>
                    {expandedSection === 'price' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {expandedSection === 'price' && (
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        step={100}
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer focus:outline-none"
                      />
                      <div className="flex flex-wrap gap-2">
                        {[200, 500, 1000, 2000].map((price) => (
                          <button
                            key={price}
                            onClick={() => handleFilterChange('priceRange', [0, price])}
                            className={`py-1 px-3 text-xs rounded-full ${
                              filters.priceRange[1] === price 
                                ? 'bg-primary text-white' 
                                : 'bg-secondary text-foreground hover:bg-secondary/70'
                            }`}
                          >
                            Under {formatPrice(price)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Brand filter */}
                <div className="space-y-3">
                  <button 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('brand')}
                  >
                    <h4 className="font-medium">Brand</h4>
                    {expandedSection === 'brand' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {expandedSection === 'brand' && (
                    <div className="space-y-2 pt-2">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <button
                            onClick={() => handleFilterChange('brand', brand)}
                            className="flex items-center"
                          >
                            <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center mr-2 border ${
                              filters.brand === brand ? 'bg-primary border-primary text-white' : 'border-muted-foreground/30'
                            }`}>
                              {filters.brand === brand && <Check size={12} />}
                            </span>
                            <span className="capitalize">
                              {brand === 'all' ? 'All Brands' : brand}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {recommendations && (
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={startNewQuiz}
                      className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Start New Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Products */}
            <div className="lg:w-3/4">
              {/* Product count and sorting */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-muted-foreground mb-3 sm:mb-0">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sort by:</span>
                  <select className="py-2 px-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              
              {/* Featured product banner (new) */}
              {filteredProducts.length > 0 && filteredProducts.some(p => p.recommended) && (
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                          TOP RECOMMENDATION
                        </span>
                      </div>
                      
                      {/* Featured product details */}
                      {(() => {
                        const featuredProduct = filteredProducts.find(p => p.recommended);
                        if (!featuredProduct) return null;
                        
                        return (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <div className="aspect-video overflow-hidden rounded-lg">
                                <img 
                                  src={featuredProduct.featuredImage} 
                                  alt={featuredProduct.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            
                            <div className="md:col-span-2">
                              <h3 className="text-xl font-semibold mb-2">{featuredProduct.name}</h3>
                              <p className="text-muted-foreground mb-4">{featuredProduct.description}</p>
                              
                              <div className="flex flex-wrap gap-3 mb-4">
                                {featuredProduct.recommendationReasons?.map((reason, idx) => (
                                  <span 
                                    key={idx} 
                                    className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-primary/15 text-primary"
                                  >
                                    <Check size={12} className="mr-1" />
                                    {reason}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold">${featuredProduct.price.toFixed(2)}</span>
                                <Button 
                                  onClick={() => {
                                    const cardElement = document.getElementById(`product-${featuredProduct.id}`);
                                    if (cardElement) {
                                      cardElement.scrollIntoView({ behavior: 'smooth' });
                                      // Add a highlight effect
                                      cardElement.classList.add('ring-4', 'ring-primary/50');
                                      setTimeout(() => {
                                        cardElement.classList.remove('ring-4', 'ring-primary/50');
                                      }, 2000);
                                    }
                                  }}
                                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                  <span>View Product Details</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Products grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} id={`product-${product.id}`}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">No products match your filters</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or browse our full catalog.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: 'all',
                        priceRange: [0, 2000],
                        brand: 'all',
                      });
                    }}
                    className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
              
              {/* Service Providers */}
              {recommendations && recommendations.serviceProviders.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Recommended Service Providers</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {recommendations.serviceProviders.map((provider) => (
                      <div key={provider.id} className="glass-card overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
                          <p className="text-muted-foreground mb-4">{provider.description}</p>
                          
                          {/* Package details */}
                          {provider.packages && (
                            <div className="mt-6">
                              <h4 className="text-lg font-medium mb-4">Available Packages</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {provider.packages.map((pkg, index) => (
                                  <div key={index} className="border rounded-lg p-4 relative border-border hover:shadow-md transition-shadow duration-200">
                                    {index === 0 && (
                                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                                          BEST VALUE
                                        </span>
                                      </div>
                                    )}
                                    <h5 className="font-semibold mb-1">{pkg.name}</h5>
                                    <p className="text-primary font-bold">${pkg.price.toFixed(2)}/mo</p>
                                    <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                                    <ul className="space-y-1">
                                      {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                          <Check size={14} className="mr-1 text-primary mt-0.5 flex-shrink-0" />
                                          <span>{feature}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                              {provider.requiresContract && (
                                <p className="text-sm text-muted-foreground mt-4">
                                  <span className="font-medium">Note:</span> Requires a {provider.contractLength}-month contract. 
                                  {provider.installationFee > 0 && 
                                    ` Installation fee: ${formatPrice(provider.installationFee)}.`
                                  }
                                </p>
                              )}
                            </div>
                          )}
                          
                          <div className="mt-6 flex justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                              {provider.compatibleEcosystems?.map((eco, idx) => (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center py-0.5 px-2 rounded-md text-xs font-medium bg-secondary text-foreground"
                                >
                                  {eco === 'amazon' ? 'Alexa' : 
                                   eco === 'google' ? 'Google Home' : 
                                   eco === 'apple' ? 'HomeKit' : 'Other'} Compatible
                                </span>
                              ))}
                            </div>
                            <Button
                              onClick={() => handleProviderClick(provider.id, provider.name, provider.website)}
                              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <ExternalLink size={16} className="mr-1" />
                              View Plans
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Monetization disclosure */}
              <div className="mt-12 text-sm text-muted-foreground border-t border-border pt-6">
                <p className="mb-2">
                  <strong>Affiliate Disclosure:</strong> We may earn a commission when you purchase products through our links. 
                  This helps support our research and testing of products at no extra cost to you.
                </p>
                <p>
                  Our recommendations are based on our independent research and testing. We maintain editorial independence 
                  from our affiliate partners to ensure unbiased advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Provider user info collection forms */}
      {showProviderForm && recommendations?.serviceProviders.map(provider => {
        if (provider.id === showProviderForm) {
          return (
            <UserInfoForm
              key={provider.id}
              onClose={() => setShowProviderForm(null)}
              onComplete={() => handleProviderFormComplete(provider.id)}
              providerName={provider.name}
              affiliateUrl={provider.website}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Recommendations;
