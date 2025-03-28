
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quiz from '../components/Quiz';
import HeroSection from '../components/home/HeroSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import ProductCategoriesSection from '../components/home/ProductCategoriesSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
    // Scroll to quiz section
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-section');
      quizElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {showQuiz ? (
        <section id="quiz-section" className="flex-grow">
          <Quiz />
        </section>
      ) : (
        <>
          <HeroSection startQuiz={startQuiz} />
          <FeaturedProductsSection />
          <ProductCategoriesSection />
          <FeaturesSection />
          <HowItWorksSection startQuiz={startQuiz} />
          <TestimonialsSection />
          <CTASection startQuiz={startQuiz} />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
