
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Home, BatteryCharging } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quiz from '../components/Quiz';

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
          {/* Hero Section */}
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
                    className="py-4 px-8 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center w-full sm:w-auto"
                  >
                    <span>Start Your Personalized Quiz</span>
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                  <Link
                    to="/recommendations"
                    className="py-4 px-8 bg-secondary text-foreground rounded-full hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  >
                    Browse All Solutions
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 bg-secondary">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Use SmartHomeAdvisor?</h2>
                <p className="text-muted-foreground">
                  We analyze your unique needs to recommend the perfect smart home solutions, saving you time and ensuring compatibility.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Security Focus</h3>
                  <p className="text-muted-foreground">
                    We prioritize security solutions that protect your home and family with cutting-edge technology.
                  </p>
                </div>
                
                <div className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '150ms' }}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Zap size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
                  <p className="text-muted-foreground">
                    Find smart devices that reduce your energy consumption and lower your monthly bills.
                  </p>
                </div>
                
                <div className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '300ms' }}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Home size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
                  <p className="text-muted-foreground">
                    Get recommendations for products that work together in a cohesive, easy-to-use system.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">
                  Get personalized smart home recommendations in three simple steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Answer Questions</h3>
                  <p className="text-muted-foreground">
                    Tell us about your home, preferences, and what you're looking for in a smart home system.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
                  <p className="text-muted-foreground">
                    Our algorithm analyzes your answers to suggest the best products and service providers.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Make Informed Decisions</h3>
                  <p className="text-muted-foreground">
                    Compare options, read details, and choose the smart home solutions that fit your needs.
                  </p>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <button
                  onClick={startQuiz}
                  className="py-4 px-8 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Start Your Personalized Quiz</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-20 bg-secondary">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-muted-foreground">
                  Hear from Canadians who found their perfect smart home solutions using our platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">MJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Michael Johnson</h4>
                      <p className="text-sm text-muted-foreground">Toronto, ON</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The quiz recommended a Ring security system that was perfect for my condo. Easy to install and exactly what I needed."
                  </p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-amber-500"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">SC</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Chen</h4>
                      <p className="text-sm text-muted-foreground">Vancouver, BC</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I was connected with a Bell Smart Home consultant who helped design the perfect system for my new house. Couldn't be happier!"
                  </p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-amber-500"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">DP</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">David Patel</h4>
                      <p className="text-sm text-muted-foreground">Calgary, AB</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The energy efficiency recommendations helped me save over $300 on my utilities last year. The ecobee thermostat was a game-changer."
                  </p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${i < 4 ? 'text-amber-500' : 'text-gray-300'}`}
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background/95" />
            </div>
            
            <div className="container-custom">
              <div className="glass-card p-10 md:p-16 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Take our quick quiz and discover the smart home solutions that will make your life easier, safer, and more efficient.
                </p>
                <button
                  onClick={startQuiz}
                  className="py-4 px-8 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Get Your Personalized Recommendations</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </section>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
