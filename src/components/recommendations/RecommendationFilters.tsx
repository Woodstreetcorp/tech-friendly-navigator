
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ProductCompatibility } from '@/data/smartHomeProducts';

interface RecommendationFiltersProps {
  filters: {
    priceRange: [number, number];
    compatibility: string[];
    brands: string[];
    showContract: boolean;
    showNoContract: boolean;
  };
  uniqueBrands: string[];
  onPriceChange: (value: number[]) => void;
  onCompatibilityFilter: (compatibility: string) => void;
  onBrandFilter: (brand: string) => void;
  onContractFilter: (type: 'contract' | 'noContract', value: boolean) => void;
  onResetFilters: () => void;
}

const RecommendationFilters = ({
  filters,
  uniqueBrands,
  onPriceChange,
  onCompatibilityFilter,
  onBrandFilter,
  onContractFilter,
  onResetFilters,
}: RecommendationFiltersProps) => {
  return (
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
                  onValueChange={onPriceChange}
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
                    onClick={() => onCompatibilityFilter(item)}
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
                {uniqueBrands.map((brand) => (
                  <Badge 
                    key={brand}
                    variant={filters.brands.includes(brand) ? "default" : "outline"}
                    className="cursor-pointer mr-2 mb-2"
                    onClick={() => onBrandFilter(brand)}
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
                    onChange={(e) => onContractFilter('contract', e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="contract" className="text-sm">Show products with contract</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="noContract" 
                    checked={filters.showNoContract} 
                    onChange={(e) => onContractFilter('noContract', e.target.checked)}
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
                onClick={onResetFilters}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default RecommendationFilters;
