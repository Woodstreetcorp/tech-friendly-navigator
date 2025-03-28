
import { Tabs } from "@/components/ui/tabs";
import { ProductCategory } from "@/data/smartHomeProducts";
import CategoryTabsList from "./TabsList";
import TabContent from "./TabContent";

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
      <CategoryTabsList 
        activeCategories={activeCategories}
        categoryCount={categoryCount}
      />
      
      {/* "All" tab content */}
      <TabContent 
        category="all" 
        showNoResults={showNoResults} 
        filteredProducts={filteredProducts} 
        onResetFilters={onResetFilters} 
      />
      
      {/* Individual category tab contents */}
      {activeCategories.map(category => (
        <TabContent 
          key={category}
          category={category} 
          showNoResults={showNoResults} 
          filteredProducts={filteredProducts} 
          onResetFilters={onResetFilters} 
        />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
