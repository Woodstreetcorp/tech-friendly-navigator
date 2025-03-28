
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Zap, Compass, Star, Check, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { useUser } from '@/context/UserContext';

import { ProductCategory, SmartHomeProduct } from '@/data/smartHomeProducts';

type RecommendationData = {
  topRecommendations: {
    product: SmartHomeProduct;
    score: number;
    matchReasons: string[];
  }[];
  recommendationsByCategory: Record<ProductCategory, {
    product: SmartHomeProduct;
    score: number;
    matchReasons: string[];
  }[]>;
  quizAnswers: Record<string, any>;
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    compatibility: [] as string[],
    brands: [] as string[],
    showContract: true,
    showNoContract: true,
  });
  const [filteredProducts, setFilteredProducts] = useState<{product: SmartHomeProduct, score: number, matchReasons: string[]}[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const { trackEvent } = useUser();

  useEffect(() => {
    const recommendationsData = localStorage.getItem('smartHomeRecommendations');
    if (recommendationsData) {
      try {
        const parsedData = JSON.parse(recommendationsData) as RecommendationData;
        setRecommendations(parsedData);
        
        // Flatten all products for the "All" tab
        const allProducts: typeof filteredProducts = [];
        if (parsedData.recommendationsByCategory) {
          Object.values(parsedData.recommendationsByCategory).forEach(categoryProducts => {
            categoryProducts.forEach(product => {
              if (!allProducts.some(p => p.product.id === product.product.id)) {
                allProducts.push(product);
              }
            });
          });
        }
        
        // Sort by score
        allProducts.sort((a, b) => b.score - a.score);
        setFilteredProducts(allProducts);
        
        // Track view
        trackEvent({
          eventType: 'recommendations_view',
          source: 'quiz_completion',
          url: window.location.href
        });
      } catch (error) {
        console.error("Error parsing recommendations:", error);
      }
    } else {
      console.log("No recommendations found in localStorage");
    }
  }, [trackEvent]);

  useEffect(() => {
    if (!recommendations) return;
    
    let filtered: typeof filteredProducts = [];
    
    if (activeTab === 'all') {
      // Flatten all products
      const allProducts: typeof filteredProducts = [];
      if (recommendations.recommendationsByCategory) {
        Object.values(recommendations.recommendationsByCategory).forEach(categoryProducts => {
          categoryProducts.forEach(product => {
            if (!allProducts.some(p => p.product.id === product.product.id)) {
              allProducts.push(product);
            }
          });
        });
      }
      filtered = allProducts;
    } else {
      filtered = recommendations.recommendationsByCategory && 
                 recommendations.recommendationsByCategory[activeTab as ProductCategory] || [];
    }
    
    // Apply filters
    filtered = filtered.filter(item => {
      const product = item.product;
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Compatibility filter
      if (filters.compatibility.length > 0) {
        const hasMatchingCompatibility = filters.compatibility.some(c => 
          product.compatibility.includes(c as any)
        );
        if (!hasMatchingCompatibility) return false;
      }
      
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Contract filter
      if (product.contractRequired && !filters.showContract) {
        return false;
      }
      
      if (!product.contractRequired && !filters.showNoContract) {
        return false;
      }
      
      return true;
    });
    
    // Sort by score
    filtered.sort((a, b) => b.score - a.score);
    
    setFilteredProducts(filtered);
    setShowNoResults(filtered.length === 0);
    
  }, [activeTab, recommendations, filters]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    trackEvent({
      eventType: 'recommendations_filter',
      filterType: 'category',
      filterValue: value,
      url: window.location.href
    });
  };

  const handleCompatibilityFilter = (compatibility: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated.compatibility.includes(compatibility)) {
        updated.compatibility = updated.compatibility.filter(c => c !== compatibility);
      } else {
        updated.compatibility.push(compatibility);
      }
      
      trackEvent({
        eventType: 'recommendations_filter',
        filterType: 'compatibility',
        filterValue: compatibility,
        filterAction: updated.compatibility.includes(compatibility) ? 'add' : 'remove',
        url: window.location.href
      });
      
      return updated;
    });
  };

  const handleBrandFilter = (brand: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated.brands.includes(brand)) {
        updated.brands = updated.brands.filter(b => b !== brand);
      } else {
        updated.brands.push(brand);
      }
      
      trackEvent({
        eventType: 'recommendations_filter',
        filterType: 'brand',
        filterValue: brand,
        filterAction: updated.brands.includes(brand) ? 'add' : 'remove',
        url: window.location.href
      });
      
      return updated;
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
    
    trackEvent({
      eventType: 'recommendations_filter',
      filterType: 'price',
      filterValue: `${value[0]}-${value[1]}`,
      url: window.location.href
    });
  };

  const handleContractFilter = (type: 'contract' | 'noContract', value: boolean) => {
    setFilters(prev => ({ 
      ...prev, 
      showContract: type === 'contract' ? value : prev.showContract,
      showNoContract: type === 'noContract' ? value : prev.showNoContract
    }));
    
    trackEvent({
      eventType: 'recommendations_filter',
      filterType: type,
      filterValue: value.toString(),
      url: window.location.href
    });
  };

  // Get unique brands from recommendations
  const getUniqueBrands = (): string[] => {
    if (!recommendations || !recommendations.recommendationsByCategory) return [];
    
    const brands = new Set<string>();
    Object.values(recommendations.recommendationsByCategory).forEach(categoryProducts => {
      if (categoryProducts) {
        categoryProducts.forEach(item => {
          if (item && item.product && item.product.brand) {
            brands.add(item.product.brand);
          }
        });
      }
    });
    
    return Array.from(brands).sort();
  };

  // Products count by category (for badges)
  const getCategoryCount = (category: ProductCategory | 'all'): number => {
    if (!recommendations || !recommendations.recommendationsByCategory) return 0;
    
    if (category === 'all') {
      const allProducts = new Set<string>();
      Object.values(recommendations.recommendationsByCategory).forEach(categoryProducts => {
        if (categoryProducts) {
          categoryProducts.forEach(item => {
            if (item && item.product) {
              allProducts.add(item.product.id);
            }
          });
        }
      });
      return allProducts.size;
    }
    
    return recommendations.recommendationsByCategory[category]?.length || 0;
  };

  // Categories with products
  const getActiveCategories = (): ProductCategory[] => {
    if (!recommendations || !recommendations.recommendationsByCategory) return [];
    
    return Object.entries(recommendations.recommendationsByCategory)
      .filter(([_, products]) => products && products.length > 0)
      .map(([category]) => category as ProductCategory);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
              <p className="text-muted-foreground">
                Based on your preferences, we've selected the best smart home solutions for you.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filter Products
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-80px)] pr-4">
                    <div className="py-6 space-y-6">
                      {/* Price Range */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Price Range</h3>
                        <div className="px-2">
                          <Slider 
                            defaultValue={[0, 1000]}
                            min={0}
                            max={1000}
                            step={10}
                            value={filters.priceRange}
                            onValueChange={handlePriceChange}
                          />
                          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                            <span>${filters.priceRange[0]}</span>
                            <span>${filters.priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Compatibility */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Compatibility</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Alexa', 'Google Assistant', 'Apple HomeKit', 'Samsung SmartThings'].map((item) => (
                            <Badge 
                              key={item}
                              variant={filters.compatibility.includes(item) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleCompatibilityFilter(item)}
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Brands */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Brands</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {getUniqueBrands().map((brand) => (
                            <Badge 
                              key={brand}
                              variant={filters.brands.includes(brand) ? "default" : "outline"}
                              className="cursor-pointer mr-2 mb-2"
                              onClick={() => handleBrandFilter(brand)}
                            >
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Contract Options */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Contract Options</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="contract" 
                              checked={filters.showContract} 
                              onChange={(e) => handleContractFilter('contract', e.target.checked)}
                              className="rounded text-primary focus:ring-primary"
                            />
                            <label htmlFor="contract" className="text-sm">Show products with contract</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="noContract" 
                              checked={filters.showNoContract} 
                              onChange={(e) => handleContractFilter('noContract', e.target.checked)}
                              className="rounded text-primary focus:ring-primary"
                            />
                            <label htmlFor="noContract" className="text-sm">Show products without contract</label>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Reset Filters */}
                      <div>
                        <Button 
                          variant="outline" 
                          onClick={() => setFilters({
                            priceRange: [0, 1000],
                            compatibility: [],
                            brands: [],
                            showContract: true,
                            showNoContract: true,
                          })}
                          className="w-full"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              
              <Link to="/talk-to-advisor">
                <Button className="flex items-center gap-2 bg-accent hover:bg-accent/90">
                  <Compass size={16} />
                  Get Expert Advice
                </Button>
              </Link>
            </div>
          </div>
          
          {recommendations?.topRecommendations && recommendations.topRecommendations.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Top Picks for You</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.topRecommendations.slice(0, 3).map((item) => (
                  <ProductCard 
                    key={item.product.id} 
                    product={item.product} 
                    matchReasons={item.matchReasons.slice(0, 2)}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <div className="overflow-x-auto pb-2">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">
                    All Products
                    <Badge variant="outline" className="ml-2">{getCategoryCount('all')}</Badge>
                  </TabsTrigger>
                  
                  {getActiveCategories().map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      <Badge variant="outline" className="ml-2">{getCategoryCount(category)}</Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="pt-4">
                {showNoResults ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertTriangle size={48} className="text-yellow-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Try adjusting your filters to see more products or reset them to see all recommendations.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setFilters({
                        priceRange: [0, 1000],
                        compatibility: [],
                        brands: [],
                        showContract: true,
                        showNoContract: true,
                      })}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((item) => (
                      <ProductCard 
                        key={item.product.id} 
                        product={item.product} 
                        matchReasons={item.matchReasons.slice(0, 2)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {getActiveCategories().map((category) => (
                <TabsContent key={category} value={category} className="pt-4">
                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <AlertTriangle size={48} className="text-yellow-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Try adjusting your filters to see more products or reset them to see all recommendations.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setFilters({
                          priceRange: [0, 1000],
                          compatibility: [],
                          brands: [],
                          showContract: true,
                          showNoContract: true,
                        })}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((item) => (
                        <ProductCard 
                          key={item.product.id} 
                          product={item.product}
                          matchReasons={item.matchReasons.slice(0, 2)} 
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need more personalized advice?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our smart home specialists can help you choose the perfect products for your needs and answer any questions you may have.
            </p>
            <Link to="/talk-to-advisor">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Talk to a Smart Home Advisor
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recommendations;
