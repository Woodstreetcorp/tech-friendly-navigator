
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdvisorCTA = () => {
  return (
    <div className="glass-card p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Need more personalized advice?</h2>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        Our smart home specialists can help you choose the perfect products for your needs and answer any questions you may have.
      </p>
      <Link to="/talk-to-advisor">
        <Button size="lg" className="bg-accent hover:bg-accent/90">
          Talk to a Smart Home Advisor
        </Button>
      </Link>
    </div>
  );
};

export default AdvisorCTA;
