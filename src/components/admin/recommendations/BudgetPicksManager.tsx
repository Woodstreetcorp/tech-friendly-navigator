
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, X } from 'lucide-react';
import { allSmartHomeProducts, SmartHomeProduct } from '@/data/smartHomeProducts';
import { toast } from 'sonner';

export default function BudgetPicksManager() {
  const [budgetPicks, setBudgetPicks] = useState<SmartHomeProduct[]>([]);
  const [availableProducts, setAvailableProducts] = useState<SmartHomeProduct[]>([]);

  // Load initial data
  useEffect(() => {
    // In a real application, this would come from an API
    const budget = allSmartHomeProducts.filter(
      product => product.priceRange === 'budget' || 
      (product.recommendationReasons && product.recommendationReasons.includes('Budget Pick'))
    );
    setBudgetPicks(budget);
    
    // Available products are those not already in budget picks
    const available = allSmartHomeProducts.filter(
      product => !budget.some(bp => bp.id === product.id) && product.priceRange !== 'budget'
    );
    setAvailableProducts(available);
  }, []);

  const addToBudgetPicks = (product: SmartHomeProduct) => {
    // Create a copy of the product with budget priceRange
    const budgetProduct: SmartHomeProduct = {
      ...product,
      priceRange: 'budget' as const,
      recommendationReasons: [
        ...(product.recommendationReasons || []),
        'Budget Pick'
      ]
    };
    
    // Add to budget picks
    setBudgetPicks(prev => [...prev, budgetProduct]);
    
    // Remove from available products
    setAvailableProducts(prev => prev.filter(p => p.id !== product.id));
    
    toast.success(`Added ${product.name} to Budget Picks`);
  };

  const removeFromBudgetPicks = (productId: string) => {
    // Get the product we're removing
    const product = budgetPicks.find(p => p.id === productId);
    if (!product) return;
    
    // If it was originally not a budget product, add it back to available products
    if (product.priceRange !== 'budget' || 
        (product.recommendationReasons && product.recommendationReasons.includes('Budget Pick'))) {
      // Create a version that's not marked as budget
      const nonBudgetProduct: SmartHomeProduct = {
        ...product,
        priceRange: 'mid-range' as const, // Default to mid-range
        recommendationReasons: product.recommendationReasons?.filter(r => r !== 'Budget Pick') || []
      };
      
      setAvailableProducts(prev => [...prev, nonBudgetProduct]);
    }
    
    // Remove from budget picks
    setBudgetPicks(prev => prev.filter(p => p.id !== productId));
    toast.success(`Removed from Budget Picks`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Budget Picks Management</h2>
          <p className="text-sm text-muted-foreground">Manage which products appear as Budget Picks in recommendations</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Current Budget Picks
            </CardTitle>
            <CardDescription>Products currently marked as Budget Picks</CardDescription>
          </CardHeader>
          <CardContent>
            {budgetPicks.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No budget picks selected yet</p>
            ) : (
              <ul className="space-y-3">
                {budgetPicks.map(product => (
                  <li key={product.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <img 
                        src={product.featuredImage} 
                        alt={product.name} 
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{product.name}</span>
                        <span className="text-xs text-muted-foreground">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFromBudgetPicks(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
            <CardDescription>Products that can be marked as Budget Picks</CardDescription>
          </CardHeader>
          <CardContent>
            {availableProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No more products available</p>
            ) : (
              <ul className="space-y-3">
                {availableProducts.map(product => (
                  <li key={product.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <img 
                        src={product.featuredImage} 
                        alt={product.name} 
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{product.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">${product.price.toFixed(2)}</span>
                          <Badge variant="outline" className="text-xs">
                            {product.priceRange}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => addToBudgetPicks(product)}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
