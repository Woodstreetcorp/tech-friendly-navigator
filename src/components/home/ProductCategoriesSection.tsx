
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, Zap, Smartphone, BatteryCharging, Database, Cpu } from 'lucide-react';

const ProductCategoriesSection = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Smart Home Product Categories</h2>
          <p className="text-muted-foreground">
            From security systems to entertainment devices, we've got everything you need for your smart home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CategoryCard 
            icon={<Shield size={24} className="text-primary" />}
            title="Smart Home Security"
            description="Security cameras, video doorbells, smart alarms, and motion sensors."
          />
          
          <CategoryCard 
            icon={<Home size={24} className="text-primary" />}
            title="Smart Lighting & Switches"
            description="Smart bulbs, light strips, switches, plugs, and dimmer systems."
          />
          
          <CategoryCard 
            icon={<Zap size={24} className="text-primary" />}
            title="Smart Climate Control"
            description="Smart thermostats, HVAC controllers, air quality monitors, and fans."
          />
          
          <CategoryCard 
            icon={<Smartphone size={24} className="text-primary" />}
            title="Smart Entertainment"
            description="Smart speakers, displays, TVs, streaming devices, and audio systems."
          />
          
          <CategoryCard 
            icon={<Cpu size={24} className="text-primary" />}
            title="Smart Locks & Access"
            description="Smart door locks, garage door openers, and keyless entry systems."
          />
          
          <CategoryCard 
            icon={<BatteryCharging size={24} className="text-primary" />}
            title="Smart Appliances"
            description="Robot vacuums, washing machines, refrigerators, and other smart appliances."
          />
          
          <CategoryCard 
            icon={<Database size={24} className="text-primary" />}
            title="Smart Hubs & Controllers"
            description="Smart home hubs, voice assistants, and universal remote controls."
          />
          
          <CategoryCard 
            icon={<Home size={24} className="text-primary" />}
            title="Outdoor Smart Devices"
            description="Outdoor cameras, lighting, smart lawn mowers, and sprinkler systems."
          />
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CategoryCard = ({ icon, title, description }: CategoryCardProps) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      <Link to="/recommendations" className="text-primary hover:underline text-sm mt-auto">
        Browse {title.split(" ")[0]} Products
      </Link>
    </div>
  );
};

export default ProductCategoriesSection;
