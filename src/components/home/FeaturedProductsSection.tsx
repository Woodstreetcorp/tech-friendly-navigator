
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FeaturedProducts from '../FeaturedProducts';

const FeaturedProductsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Popular Smart Home Solutions</h2>
          <p className="text-muted-foreground">
            Explore our most recommended smart home products and services without taking the quiz.
          </p>
        </div>
        
        <FeaturedProducts />
        
        <div className="mt-12 text-center">
          <Link to="/recommendations" className="btn-accent">
            View All Products and Services
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
