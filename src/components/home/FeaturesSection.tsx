
import { Shield, Zap, Home } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Use SmartHomeAdvisor?</h2>
          <p className="text-muted-foreground">
            We analyze your unique needs to recommend the perfect smart home solutions, saving you time and ensuring compatibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield size={24} className="text-primary" />}
            title="Security Focus"
            description="We prioritize security solutions that protect your home and family with cutting-edge technology."
            delay={0}
          />
          
          <FeatureCard 
            icon={<Zap size={24} className="text-primary" />}
            title="Energy Efficiency"
            description="Find smart devices that reduce your energy consumption and lower your monthly bills."
            delay={150}
          />
          
          <FeatureCard 
            icon={<Home size={24} className="text-primary" />}
            title="Seamless Integration"
            description="Get recommendations for products that work together in a cohesive, easy-to-use system."
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in"
      style={{ animationDelay: delay ? `${delay}ms` : undefined }}
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeaturesSection;
