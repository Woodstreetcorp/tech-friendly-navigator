
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCategory } from "@/data/smartHomeProducts";
import { capitalizeFirstLetter } from "@/lib/utils";
import ProductGrid from "./ProductGrid";
import NoResultsMessage from "./NoResultsMessage";
import ServiceProviderGrid from "./ServiceProviderGrid";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  categoryCount: (category: ProductCategory | 'all' | 'providers') => number;
  activeCategories: (ProductCategory | 'providers')[];
  filteredProducts: any[];
  showNoResults: boolean;
  onResetFilters: () => void;
}

const CategoryTabs = ({
  activeTab,
  onTabChange,
  categoryCount,
  activeCategories,
  filteredProducts,
  showNoResults,
  onResetFilters
}: CategoryTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-8 flex flex-wrap gap-2 h-auto">
        <TabsTrigger key="all" value="all" className="relative">
          All Categories
          <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/10 text-xs font-medium">
            {categoryCount('all')}
          </span>
        </TabsTrigger>
        
        {activeCategories.map(category => (
          <TabsTrigger key={category} value={category} className="relative">
            {category === 'providers' ? 'Service Providers' : capitalizeFirstLetter(category)}
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/10 text-xs font-medium">
              {categoryCount(category)}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all">
        <Card className="border-none shadow-none">
          <CardContent className="p-0 mt-4">
            {showNoResults ? (
              <NoResultsMessage onResetFilters={onResetFilters} />
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      {activeTab === 'providers' && (
        <TabsContent value="providers">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 mt-4">
              <ServiceProviderGrid />
            </CardContent>
          </Card>
        </TabsContent>
      )}
      
      {activeCategories
        .filter(category => category !== 'providers')
        .map(category => (
          <TabsContent key={category} value={category}>
            <Card className="border-none shadow-none">
              <CardContent className="p-0 mt-4">
                {showNoResults ? (
                  <NoResultsMessage onResetFilters={onResetFilters} />
                ) : (
                  <ProductGrid products={filteredProducts} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
    </Tabs>
  );
};

export default CategoryTabs;
