
import { Info, Users, Star, Award, Handshake } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-secondary/50 relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About approvU Smart Home Tech</h1>
            <p className="text-xl text-muted-foreground">
              Your trusted advisor for navigating the complex world of smart home technology in Canada.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Info className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <p className="text-lg text-center mb-6">
              At approvU, we believe that smart home technology should enhance your lifestyle, not complicate it. 
              Our mission is to simplify the decision-making process for Canadians by providing personalized 
              recommendations that perfectly match your unique needs.
            </p>
            <p className="text-lg text-center">
              We're committed to offering unbiased, expert advice that helps you navigate the complex world of 
              smart home technology while identifying opportunities to save through bundle offers and discounts.
            </p>
          </div>
        </div>
      </section>
      
      {/* What Makes Us Different */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-16">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Truly Personalized</h3>
              <p className="text-muted-foreground">
                Our sophisticated recommendation engine analyzes your specific needs to suggest products and services 
                that truly match your lifestyle and preferences.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Canadian Focus</h3>
              <p className="text-muted-foreground">
                We understand the Canadian market, including regional service providers, pricing structures, and 
                availability specific to different provinces.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bundle Savings</h3>
              <p className="text-muted-foreground">
                We identify opportunities to save by leveraging your existing service provider relationships and 
                uncovering bundle offers that others might miss.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-16">Our Team</h2>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="text-lg text-center max-w-3xl mx-auto mb-16">
            The approvU team brings together expertise in smart home technology, telecommunications, and consumer 
            advocacy. We're passionate about helping Canadians make informed decisions about their homes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JD</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Jamie Davidson</h3>
              <p className="text-sm text-muted-foreground mb-4">Founder & CEO</p>
              <p className="text-muted-foreground">
                Former telecommunications executive with 15+ years of experience in the Canadian market.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">SP</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Sophia Patel</h3>
              <p className="text-sm text-muted-foreground mb-4">Chief Technology Officer</p>
              <p className="text-muted-foreground">
                Smart home integration specialist with background in IoT and home automation systems.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">MT</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Michael Tremblay</h3>
              <p className="text-sm text-muted-foreground mb-4">Head of Partnerships</p>
              <p className="text-muted-foreground">
                Works directly with Canadian service providers to negotiate exclusive bundle offers for our users.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Unbiased Recommendations</h3>
              <p className="text-muted-foreground">
                We're not tied to any specific brands or providers. Our recommendations are based solely on what's best for you.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We clearly explain why we recommend certain products and always disclose any partnerships or affiliate relationships.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">User Privacy</h3>
              <p className="text-muted-foreground">
                Your data is secure with us. We don't sell your information and only use your quiz answers to provide better recommendations.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Continuous Improvement</h3>
              <p className="text-muted-foreground">
                We regularly update our product database and recommendation engine to ensure you always get the most current advice.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="glass-card p-10 md:p-16 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Smart Home Solution?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Take our personalized quiz and discover the smart home products and services that are right for your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/" className="btn-primary w-full sm:w-auto">
                Start Your Smart Home Journey
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
