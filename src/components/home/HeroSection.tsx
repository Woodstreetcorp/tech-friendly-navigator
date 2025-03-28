
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessagesSquare } from 'lucide-react';

interface HeroSectionProps {
  startQuiz: () => void;
}

const HeroSection = ({ startQuiz }: HeroSectionProps) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background/95" />
      </div>
      
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span className="mr-1">🇨🇦</span> Canadian Smart Home Advisor
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Find Your Perfect Smart Home Solution
          </h1>
          <p className="text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '150ms' }}>
            Answer a few simple questions and we'll recommend the best smart home products and services for your unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={startQuiz}
              className="btn-primary w-full sm:w-auto"
            >
              <span>Start Your Personalized Quiz</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
            <Link
              to="/talk-to-advisor"
              className="btn-accent w-full sm:w-auto group"
            >
              <MessagesSquare size={18} className="mr-2 group-hover:animate-pulse" />
              Talk to an Advisor
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4 animate-slide-up" style={{ animationDelay: '450ms' }}>
            Prefer to browse? <Link to="/recommendations" className="text-primary hover:underline">View all solutions</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
