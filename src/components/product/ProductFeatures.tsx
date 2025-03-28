
import { Check } from "lucide-react";
import { SmartHomeProduct } from "@/data/smartHomeProducts";

interface ProductFeaturesProps {
  features: SmartHomeProduct['features'];
}

const ProductFeatures = ({ features }: ProductFeaturesProps) => {
  return (
    <div className="glass-card p-8 mb-16">
      <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check size={20} className="mr-2 text-primary mt-0.5 flex-shrink-0" />
            <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;
