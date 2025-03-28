
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign } from 'lucide-react';
import { SmartHomeProduct, allSmartHomeProducts } from '@/data/smartHomeProducts';

export const BudgetPicksManager = () => {
  const [products, setProducts] = useState<SmartHomeProduct[]>([]);
  const [budgetPicks, setBudgetPicks] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [needsSaving, setNeedsSaving] = useState(false);

  // Load data
  useEffect(() => {
    // In a real app, we would fetch this from an API
    setProducts(allSmartHomeProducts);
    
    // Get current budget picks from localStorage
    const budgetPicksData = localStorage.getItem('smartHomeBudgetPicks');
    if (budgetPicksData) {
      try {
        const parsedData = JSON.parse(budgetPicksData);
        setBudgetPicks(parsedData);
      } catch (error) {
        console.error("Error parsing budget picks:", error);
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

  const toggleBudgetPick = (productId: string) => {
    setBudgetPicks(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
    setNeedsSaving(true);
  };

  const saveBudgetPicks = () => {
    // Update the priceRange property for all products
    const updatedProducts = products.map(product => {
      if (budgetPicks.includes(product.id)) {
        // Add "Budget Pick" to recommendation reasons if not already present
        let recommendationReasons = product.recommendationReasons || [];
        if (!recommendationReasons.includes('Budget Pick')) {
          recommendationReasons = [...recommendationReasons, 'Budget Pick'];
        }
        return {
          ...product,
          priceRange: 'budget',
          recommendationReasons
        };
      }
      return product;
    });

    // Save budget picks to localStorage
    localStorage.setItem('smartHomeBudgetPicks', JSON.stringify(budgetPicks));
    
    // In a real app, we would save these changes to the API
    // For now, just update the local state
    setProducts(updatedProducts);
    setNeedsSaving(false);
    
    // Show success message
    alert('Budget picks saved successfully!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Budget Picks Manager
        </CardTitle>
        <CardDescription>
          Select products to mark as "Budget Pick" on the Recommendations page
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
              {budgetPicks.length} budget picks
            </Badge>
            <Button 
              onClick={saveBudgetPicks} 
              disabled={!needsSaving}
              size="sm"
            >
              Save Budget Picks
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[450px] rounded-md border p-4">
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${
                  budgetPicks.includes(product.id) 
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
                    {product.priceRange === 'budget' && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-medium">Budget Pick</span>
                      </>
                    )}
                  </div>
                </div>
                <Checkbox 
                  checked={budgetPicks.includes(product.id)}
                  onCheckedChange={() => toggleBudgetPick(product.id)}
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

export default BudgetPicksManager;
