
import { TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter } from "@/lib/utils";

interface TabProps {
  category: string;
  count: number;
}

const Tab = ({ category, count }: TabProps) => {
  const displayName = category === 'providers' 
    ? 'Service Providers' 
    : capitalizeFirstLetter(category);

  return (
    <TabsTrigger key={category} value={category} className="relative">
      {displayName}
      <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/10 text-xs font-medium">
        {count}
      </span>
    </TabsTrigger>
  );
};

export default Tab;
