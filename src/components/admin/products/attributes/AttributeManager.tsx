
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoriesManager } from './CategoriesManager';
import { BrandsManager } from './BrandsManager';
import { PriceRangesManager } from './PriceRangesManager';
import { CompatibilityManager } from './CompatibilityManager';
import { ProviderCategoriesManager } from './ProviderCategoriesManager';

export const AttributeManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Product Attributes</h2>
        <p className="text-muted-foreground">Manage categories, brands, and other product attributes</p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="price-ranges">Price Ranges</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="provider-categories">Provider Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories">
          <CategoriesManager />
        </TabsContent>
        
        <TabsContent value="brands">
          <BrandsManager />
        </TabsContent>
        
        <TabsContent value="price-ranges">
          <PriceRangesManager />
        </TabsContent>
        
        <TabsContent value="compatibility">
          <CompatibilityManager />
        </TabsContent>
        
        <TabsContent value="provider-categories">
          <ProviderCategoriesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
