
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProductCategory } from '@/data/smartHomeProducts';
import { NoResultsMessage } from './NoResultsMessage';
import ProductGrid from './ProductGrid';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  categoryCount: (category: ProductCategory | 'all') => number;
  activeCategories: ProductCategory[];
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
    <Tabs defaultValue="all" onValueChange={onTabChange}>
      <div className="overflow-x-auto pb-2">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Products
            <Badge variant="outline" className="ml-2">{categoryCount('all')}</Badge>
          </TabsTrigger>
          
          {activeCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <Badge variant="outline" className="ml-2">{categoryCount(category)}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      <TabsContent value="all" className="pt-4">
        {showNoResults ? (
          <NoResultsMessage onResetFilters={onResetFilters} />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </TabsContent>
      
      {activeCategories.map((category) => (
        <TabsContent key={category} value={category} className="pt-4">
          {filteredProducts.length === 0 ? (
            <NoResultsMessage onResetFilters={onResetFilters} />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
