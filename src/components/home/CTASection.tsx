
import { Link } from 'react-router-dom';
import { ArrowRight, MessagesSquare } from 'lucide-react';

interface CTASectionProps {
  startQuiz: () => void;
}

const CTASection = ({ startQuiz }: CTASectionProps) => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background/95" />
      </div>
      
      <div className="container-custom">
        <div className="glass-card p-10 md:p-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get personalized smart home recommendations through our quiz or speak directly with a smart home specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startQuiz}
              className="btn-primary"
            >
              <span>Take the Quiz</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
            <Link
              to="/talk-to-advisor"
              className="btn-accent"
            >
              <MessagesSquare size={18} className="mr-2" />
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
