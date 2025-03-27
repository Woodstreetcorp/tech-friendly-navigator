
import { useState } from 'react';
import { CalendarDays, MessagesSquare, Phone, ArrowRight, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';

const TalkToAdvisor = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { trackEvent } = useUser();
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowForm(true);
    
    // Track selection event
    trackEvent({
      eventType: 'advisor_contact_method_selected',
      contactMethod: option,
    });
    
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('contact-form');
      formElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track form submission
    trackEvent({
      eventType: 'advisor_contact_submitted',
      contactMethod: selectedOption || 'unknown',
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Your ${selectedOption === 'call' ? 'call' : selectedOption === 'chat' ? 'chat' : 'appointment'} request has been submitted! An advisor will be in touch soon.`
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredTime: '',
      });
      setShowForm(false);
      setSelectedOption(null);
    }, 1500);
  };
  
  const advisorOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      icon: <MessagesSquare className="h-10 w-10 text-primary" />,
      description: 'Connect instantly with a smart home advisor via live chat.',
      benefits: [
        'Get immediate answers to your questions',
        'Share your requirements and receive personalized recommendations',
        'No phone call or appointment needed'
      ],
      cta: 'Start Live Chat'
    },
    {
      id: 'call',
      title: 'Phone Consultation',
      icon: <Phone className="h-10 w-10 text-primary" />,
      description: 'Speak directly with a smart home expert over the phone.',
      benefits: [
        'In-depth discussion about your smart home needs',
        'Expert advice on product compatibility and installation',
        'Convenient call-back at your preferred time'
      ],
      cta: 'Request Call Back'
    },
    {
      id: 'appointment',
      title: 'Schedule Appointment',
      icon: <CalendarDays className="h-10 w-10 text-primary" />,
      description: 'Book a video or in-person consultation with a smart home specialist.',
      benefits: [
        'Virtual home assessment to identify optimal solutions',
        'Detailed walkthrough of recommended products and services',
        'Personalized smart home planning session'
      ],
      cta: 'Book Appointment'
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="mr-1">🧠</span> Expert Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Talk to a Smart Home Advisor
            </h1>
            <p className="text-xl text-muted-foreground">
              Get personalized recommendations and expert advice from our certified smart home specialists, tailored to your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {advisorOptions.map((option) => (
              <Card 
                key={option.id} 
                className={`border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  selectedOption === option.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">{option.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {option.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleOptionSelect(option.id)}
                    className="w-full"
                    variant={selectedOption === option.id ? "default" : "outline"}
                  >
                    {option.cta}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {showForm && (
            <div 
              id="contact-form" 
              className="max-w-2xl mx-auto bg-card rounded-lg border p-6 animate-fade-in"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {selectedOption === 'chat' ? 'Start Live Chat' : 
                 selectedOption === 'call' ? 'Request Call Back' : 
                 'Book Appointment'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                
                {(selectedOption === 'call' || selectedOption === 'appointment') && (
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium mb-1">
                      Preferred {selectedOption === 'call' ? 'Call' : 'Appointment'} Time
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    What can we help you with? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    placeholder="Please share any specific questions or requirements you have..."
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="submit" 
                    className="min-w-32"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⚙️</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          <div className="max-w-3xl mx-auto mt-16 bg-secondary/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-center">Why Talk to Our Smart Home Advisors?</h3>
            <p className="text-muted-foreground text-center mb-4">
              Our certified specialists have extensive experience in designing and implementing smart home solutions for Canadian homes. They can help you:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start p-3">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Navigate complex options</p>
                  <p className="text-sm text-muted-foreground">Our experts help simplify technical choices</p>
                </div>
              </div>
              
              <div className="flex items-start p-3">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Stay within budget</p>
                  <p className="text-sm text-muted-foreground">Get cost-effective recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start p-3">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Ensure compatibility</p>
                  <p className="text-sm text-muted-foreground">Avoid costly integration mistakes</p>
                </div>
              </div>
              
              <div className="flex items-start p-3">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Plan for the future</p>
                  <p className="text-sm text-muted-foreground">Build expandable smart home systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TalkToAdvisor;
