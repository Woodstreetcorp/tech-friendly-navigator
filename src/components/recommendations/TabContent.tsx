
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { NoResultsMessage } from "./NoResultsMessage";
import ProductGrid from "./ProductGrid";
import ServiceProviderGrid from "./ServiceProviderGrid";

interface TabContentProps {
  category: string;
  showNoResults: boolean;
  filteredProducts: any[];
  onResetFilters: () => void;
}

const TabContent = ({ 
  category, 
  showNoResults, 
  filteredProducts, 
  onResetFilters 
}: TabContentProps) => {
  return (
    <TabsContent value={category}>
      <Card className="border-none shadow-none">
        <CardContent className="p-0 mt-4">
          {category === 'providers' ? (
            <ServiceProviderGrid />
          ) : (
            showNoResults ? (
              <NoResultsMessage onResetFilters={onResetFilters} />
            ) : (
              <ProductGrid products={filteredProducts} />
            )
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default TabContent;
