
import { TabsList } from "@/components/ui/tabs";
import { ProductCategory } from "@/data/smartHomeProducts";
import Tab from "./Tab";

interface TabsListProps {
  activeCategories: (ProductCategory | 'providers')[];
  categoryCount: (category: ProductCategory | 'all' | 'providers') => number;
}

const CategoryTabsList = ({ 
  activeCategories,
  categoryCount
}: TabsListProps) => {
  return (
    <TabsList className="mb-8 flex flex-wrap gap-2 h-auto">
      <Tab category="all" count={categoryCount('all')} />
      
      {activeCategories.map(category => (
        <Tab 
          key={category} 
          category={category} 
          count={categoryCount(category)} 
        />
      ))}
    </TabsList>
  );
};

export default CategoryTabsList;
