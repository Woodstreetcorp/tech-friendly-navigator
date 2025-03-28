
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Star } from 'lucide-react';
import { SmartHomeProduct, allSmartHomeProducts } from '@/data/smartHomeProducts';

export const TopPicksManager = () => {
  const [products, setProducts] = useState<SmartHomeProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [needsSaving, setNeedsSaving] = useState(false);

  // Load data
  useEffect(() => {
    // In a real app, we would fetch this from an API
    setProducts(allSmartHomeProducts);
    
    // Get current top picks from localStorage
    const recommendationsData = localStorage.getItem('smartHomeRecommendations');
    if (recommendationsData) {
      try {
        const parsedData = JSON.parse(recommendationsData);
        if (parsedData.topRecommendations) {
          const topPickIds = parsedData.topRecommendations.map((item: any) => item.product.id);
          setSelectedProducts(topPickIds);
        }
      } catch (error) {
        console.error("Error parsing recommendations:", error);
      }
    }
  }, []);

  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'security', label: 'Security' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'climate', label: 'Climate Control' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        // Limit to 5 selections
        if (prev.length >= 5) {
          return [...prev.slice(1), productId];
        }
        return [...prev, productId];
      }
    });
    setNeedsSaving(true);
  };

  const saveTopPicks = () => {
    // Get existing recommendations
    const recommendationsData = localStorage.getItem('smartHomeRecommendations');
    let recommendations: any = {};
    
    if (recommendationsData) {
      try {
        recommendations = JSON.parse(recommendationsData);
      } catch (error) {
        console.error("Error parsing recommendations:", error);
      }
    }
    
    // Create the top recommendations array
    const topRecommendations = selectedProducts.map(id => {
      const product = products.find(p => p.id === id);
      return {
        product,
        score: 100,
        matchReasons: product?.recommendationReasons || ['Admin selected']
      };
    });
    
    // Update recommendations
    recommendations.topRecommendations = topRecommendations;
    
    // Save back to localStorage
    localStorage.setItem('smartHomeRecommendations', JSON.stringify(recommendations));
    setNeedsSaving(false);
    
    // Show success message
    alert('Top picks saved successfully!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Top Picks Manager
        </CardTitle>
        <CardDescription>
          Select up to 5 products to feature as "Top Picks" on the Recommendations page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="category-filter">Filter by Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter" className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="ml-auto">
              {selectedProducts.length}/5 selected
            </Badge>
            <Button 
              onClick={saveTopPicks} 
              disabled={!needsSaving}
              size="sm"
            >
              Save Top Picks
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[450px] rounded-md border p-4">
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${
                  selectedProducts.includes(product.id) 
                    ? 'bg-muted/50 border border-primary/20' 
                    : 'hover:bg-muted/30 border border-transparent'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-md">
                  <img 
                    src={product.featuredImage} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{product.name}</div>
                    <Badge variant={product.priceRange === 'budget' ? 'secondary' : 'outline'}>
                      ${product.price.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="font-medium">{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>
                </div>
                <Checkbox 
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleProductSelection(product.id)}
                  className="h-5 w-5"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TopPicksManager;
