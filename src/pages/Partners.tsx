
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';
import { HandShake, Users, TrendingUp } from 'lucide-react';

const Partners = () => {
  const { trackEvent } = useUser();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    website: '',
    productCategories: '',
    commissionRate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send this data to your backend
    console.log('Partner application:', formData);
    
    // Track the partner application event
    trackEvent({
      eventType: 'partner_application',
      source: 'partners_page',
      url: window.location.href
    });
    
    // Store in localStorage for demonstration
    const partners = JSON.parse(localStorage.getItem('smartHomePartners') || '[]');
    partners.push({
      ...formData,
      id: `partner-${Date.now()}`,
      status: 'pending',
      dateApplied: new Date().toISOString()
    });
    localStorage.setItem('smartHomePartners', JSON.stringify(partners));
    
    toast.success("Thank you for your application! We'll review it and contact you soon.");
    
    // Reset form
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      website: '',
      productCategories: '',
      commissionRate: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h1>
              <p className="text-lg text-muted-foreground">
                List your smart home products and services on our platform and reach thousands of potential customers.
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <HandShake className="mr-2 h-5 w-5 text-primary" />
                      Why Partner With Us?
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Reach thousands of qualified leads actively seeking smart home solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Get featured in our curated product recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Access detailed analytics on customer engagement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Enhance your brand visibility in the smart home market</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Our Audience
                    </h3>
                    <div className="space-y-3">
                      <p>Our platform connects your products with homeowners and renters across Canada who are actively looking for smart home solutions.</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>85% homeowners / 15% renters</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Top interests: Security, Energy Efficiency, Automation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Average budget: $500-$1,500</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    How It Works
                  </h3>
                  <p className="mb-4">
                    When you partner with us, your products or services get listed on our platform. We earn a commission 
                    set by you when customers purchase through our referrals. You maintain control over your commission 
                    structure while gaining access to our growing user base of smart home enthusiasts.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">Apply to Become a Partner</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                          Company Name
                        </label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                          Contact Name
                        </label>
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium mb-1">
                          Website
                        </label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="productCategories" className="block text-sm font-medium mb-1">
                          Product Categories
                        </label>
                        <Input
                          id="productCategories"
                          name="productCategories"
                          placeholder="e.g., Security, Lighting, Thermostats"
                          value={formData.productCategories}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="commissionRate" className="block text-sm font-medium mb-1">
                          Proposed Commission Rate (%)
                        </label>
                        <Input
                          id="commissionRate"
                          name="commissionRate"
                          type="number"
                          min="1"
                          max="50"
                          value={formData.commissionRate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-3">Current Partner Brands</h3>
              <div className="flex flex-wrap justify-center gap-8 mt-6">
                <div className="flex items-center justify-center bg-secondary/50 w-32 h-16 rounded-lg">Bell</div>
                <div className="flex items-center justify-center bg-secondary/50 w-32 h-16 rounded-lg">Rogers</div>
                <div className="flex items-center justify-center bg-secondary/50 w-32 h-16 rounded-lg">Telus</div>
                <div className="flex items-center justify-center bg-secondary/50 w-32 h-16 rounded-lg">Ecobee</div>
                <div className="flex items-center justify-center bg-secondary/50 w-32 h-16 rounded-lg">Ring</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Partners;
