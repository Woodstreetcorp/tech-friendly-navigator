
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Home, BatteryCharging, Database, Cpu, Smartphone, MessagesSquare } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quiz from '../components/Quiz';
import FeaturedProducts from '../components/FeaturedProducts';

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
          
          {/* Featured Products Section */}
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
                  <div className="feature-icon">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Security Focus</h3>
                  <p className="text-muted-foreground">
                    We prioritize security solutions that protect your home and family with cutting-edge technology.
                  </p>
                </div>
                
                <div className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '150ms' }}>
                  <div className="feature-icon">
                    <Zap size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
                  <p className="text-muted-foreground">
                    Find smart devices that reduce your energy consumption and lower your monthly bills.
                  </p>
                </div>
                
                <div className="glass-card p-8 h-full flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '300ms' }}>
                  <div className="feature-icon">
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
          
          {/* How It Works Section - Updated with both quiz and advisor options */}
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
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">Quick process (takes ~3 minutes)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">Instant recommendations</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">Compare products and services</p>
                    </div>
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
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">In-depth consultation</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">Expert guidance for complex needs</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-sm">Chat, call, or schedule appointment</p>
                    </div>
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
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
