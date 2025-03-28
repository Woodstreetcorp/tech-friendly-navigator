
import { Link } from 'react-router-dom';
import { ArrowRight, MessagesSquare, Check } from 'lucide-react';

interface HowItWorksSectionProps {
  startQuiz: () => void;
}

const HowItWorksSection = ({ startQuiz }: HowItWorksSectionProps) => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Two Ways to Get Help</h2>
          <p className="text-muted-foreground">
            Choose the option that works best for you to find your perfect smart home solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Take the Quiz</h3>
            <p className="text-muted-foreground mb-6">
              Answer a few simple questions and get instant recommendations based on your specific needs and preferences.
            </p>
            
            <div className="space-y-3 text-left mb-6 w-full">
              <FeatureItem text="Quick process (takes ~3 minutes)" />
              <FeatureItem text="Instant recommendations" />
              <FeatureItem text="Compare products and services" />
            </div>
            
            <button
              onClick={startQuiz}
              className="btn-primary mt-auto"
            >
              <span>Start Quiz</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          <div className="glass-card p-8 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Talk to an Advisor</h3>
            <p className="text-muted-foreground mb-6">
              Connect with a smart home specialist who can provide personalized guidance and answer all your questions.
            </p>
            
            <div className="space-y-3 text-left mb-6 w-full">
              <FeatureItem text="In-depth consultation" />
              <FeatureItem text="Expert guidance for complex needs" />
              <FeatureItem text="Chat, call, or schedule appointment" />
            </div>
            
            <Link
              to="/talk-to-advisor"
              className="btn-accent mt-auto"
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

interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-start">
      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
        <Check size={14} className="text-primary" />
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default HowItWorksSection;
