import { useState, useEffect } from 'react';
import { ProductCategory, SmartHomeProduct } from '@/data/smartHomeProducts';
import { useUser } from '@/context/UserContext';
import { generateRecommendations } from '@/utils/recommendationEngine';

type RecommendationItem = {
  product: SmartHomeProduct;
  score: number;
  matchReasons: string[];
};

type RecommendationData = {
  topRecommendations: RecommendationItem[];
  recommendationsByCategory: Record<ProductCategory, RecommendationItem[]>;
  quizAnswers: Record<string, any>;
};

export const useRecommendationFilters = () => {
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    compatibility: [] as string[],
    brands: [] as string[],
    showContract: true,
    showNoContract: true,
  });
  const [filteredProducts, setFilteredProducts] = useState<RecommendationItem[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const { trackEvent } = useUser();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Debug localStorage content
  useEffect(() => {
    const recommendationsData = localStorage.getItem('smartHomeRecommendations');
    console.log('Raw recommendations data from localStorage:', recommendationsData);
  }, []);

  // Load recommendations from localStorage
  useEffect(() => {
    const recommendationsData = localStorage.getItem('smartHomeRecommendations');
    if (recommendationsData) {
      try {
        const parsedData = JSON.parse(recommendationsData) as RecommendationData;
        console.log('Parsed recommendations data:', parsedData);
        
        // Add fallback data if parsedData is incomplete
        if (!parsedData.topRecommendations || !parsedData.recommendationsByCategory) {
          console.log('Adding fallback data to incomplete recommendations');
          // Import the function directly - no require
          const fallbackRecommendations = generateRecommendations({});
          setRecommendations(fallbackRecommendations);
        } else {
          setRecommendations(parsedData);
        }
        
        // Track view only once
        if (!hasTrackedView) {
          trackEvent({
            eventType: 'recommendations_view',
            source: 'quiz_completion',
            url: window.location.href
          });
          setHasTrackedView(true);
        }
      } catch (error) {
        console.error("Error parsing recommendations:", error);
        // Generate fallback recommendations on parse error
        console.log('Generating fallback recommendations due to parse error');
        const fallbackRecommendations = generateRecommendations({});
        setRecommendations(fallbackRecommendations);
      }
    } else {
      console.log("No recommendations found in localStorage, generating fallback data");
      // Generate fallback recommendations if none exist
      const fallbackRecommendations = generateRecommendations({});
      setRecommendations(fallbackRecommendations);
    }
  }, [trackEvent, hasTrackedView]);

  // Apply filters when recommendations or activeTab changes
  useEffect(() => {
    if (!recommendations) {
      console.log('No recommendations available for filtering');
      return;
    }
    
    console.log('Filtering recommendations for tab:', activeTab);
    console.log('Current filters:', filters);
    
    let filtered: RecommendationItem[] = [];
    
    if (activeTab === 'all') {
      // Flatten all products
      const allProducts: RecommendationItem[] = [];
      if (recommendations.recommendationsByCategory) {
        Object.entries(recommendations.recommendationsByCategory).forEach(([_, categoryProducts]) => {
          if (categoryProducts && Array.isArray(categoryProducts)) {
            categoryProducts.forEach(product => {
              if (product && product.product && !allProducts.some(p => p.product.id === product.product.id)) {
                allProducts.push(product);
              }
            });
          }
        });
      }
      filtered = allProducts;
    } else {
      filtered = recommendations.recommendationsByCategory && 
                 Array.isArray(recommendations.recommendationsByCategory[activeTab as ProductCategory]) ?
                 recommendations.recommendationsByCategory[activeTab as ProductCategory] : [];
    }
    
    console.log(`Found ${filtered.length} products for tab ${activeTab} before applying filters`);
    
    // Apply filters
    filtered = filtered.filter(item => {
      if (!item || !item.product) {
        console.log('Filtering out invalid product item:', item);
        return false;
      }
      
      const product = item.product;
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Compatibility filter
      if (filters.compatibility.length > 0) {
        const hasMatchingCompatibility = filters.compatibility.some(c => 
          product.compatibility && product.compatibility.includes(c as any)
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
    
    console.log(`After filtering: ${filtered.length} products remain`);
    
    // Sort by score
    filtered.sort((a, b) => b.score - a.score);
    
    setFilteredProducts(filtered);
    setShowNoResults(filtered.length === 0);
    
  }, [activeTab, recommendations, filters]);

  // Event handlers
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    trackEvent({
      eventType: 'recommendations_filter',
      source: 'category_tab',
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
        source: 'compatibility_filter',
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
        source: 'brand_filter',
        url: window.location.href
      });
      
      return updated;
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value as [number, number] }));
    
    trackEvent({
      eventType: 'recommendations_filter',
      source: 'price_filter',
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
      source: 'contract_filter',
      url: window.location.href
    });
  };

  const resetFilters = () => {
    console.log('Resetting all filters');
    setFilters({
      priceRange: [0, 1000],
      compatibility: [],
      brands: [],
      showContract: true,
      showNoContract: true,
    });
  };

  // Get unique brands from recommendations
  const getUniqueBrands = (): string[] => {
    if (!recommendations || !recommendations.recommendationsByCategory) return [];
    
    const brands = new Set<string>();
    
    Object.entries(recommendations.recommendationsByCategory).forEach(([_, categoryProducts]) => {
      if (categoryProducts && Array.isArray(categoryProducts)) {
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
      let count = 0;
      Object.values(recommendations.recommendationsByCategory).forEach(categoryProducts => {
        if (categoryProducts && Array.isArray(categoryProducts)) {
          count += categoryProducts.length;
        }
      });
      return count;
    }
    
    return recommendations.recommendationsByCategory[category] && 
           Array.isArray(recommendations.recommendationsByCategory[category]) ? 
           recommendations.recommendationsByCategory[category].length : 0;
  };

  // Categories with products
  const getActiveCategories = (): ProductCategory[] => {
    if (!recommendations || !recommendations.recommendationsByCategory) return [];
    
    return Object.entries(recommendations.recommendationsByCategory)
      .filter(([_, products]) => products && Array.isArray(products) && products.length > 0)
      .map(([category]) => category as ProductCategory);
  };

  return {
    recommendations,
    activeTab,
    filters,
    filteredProducts,
    showNoResults,
    handleTabChange,
    handleCompatibilityFilter,
    handleBrandFilter,
    handlePriceChange,
    handleContractFilter,
    resetFilters,
    getUniqueBrands,
    getCategoryCount,
    getActiveCategories
  };
};
