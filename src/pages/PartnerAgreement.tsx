
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { ScrollArea } from '../components/ui/scroll-area';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';

const PartnerAgreement = () => {
  const { trackEvent } = useUser();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      // Track the agreement acceptance
      trackEvent({
        eventType: 'partner_agreement_accepted',
        source: 'partner_agreement_page',
        url: window.location.href
      });
      
      toast.success("Agreement accepted! You can now proceed with your application.");
      navigate('/partners');
    } else {
      toast.error("Please accept the terms of the agreement to continue.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Partner Agreement</h1>
              <div className="flex justify-center items-center text-muted-foreground">
                <FileText className="mr-2 h-5 w-5" />
                <p>Please review the terms of our partnership carefully</p>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <ScrollArea className="h-[400px] rounded-md border p-4 bg-background/50">
                <div className="space-y-6 pr-3">
                  <h2 className="text-xl font-semibold">Smart Home Marketplace Partner Agreement</h2>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                    <p>This Partner Agreement ("Agreement") is entered into between Smart Home Marketplace ("Platform") and the entity applying to become a partner ("Partner"). This Agreement outlines the terms and conditions of the partnership.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">2. Partnership Overview</h3>
                    <p>The Platform operates an online marketplace for smart home products and services. The Partner wishes to list their products or services on the Platform to reach the Platform's user base. The Platform will showcase the Partner's offerings and receive a commission on sales generated through the Platform.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">3. Partner Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Provide accurate and up-to-date information about products or services</li>
                      <li>Maintain inventory accuracy and update the Platform promptly of any changes</li>
                      <li>Fulfill all orders promptly and professionally</li>
                      <li>Provide customer support for products or services sold</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Maintain product quality standards</li>
                      <li>Provide necessary marketing materials and product images</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">4. Platform Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Display Partner products or services on the Platform</li>
                      <li>Process user interactions and forward qualified leads to Partner</li>
                      <li>Provide analytics and reporting on product performance</li>
                      <li>Maintain the Platform's functionality and user experience</li>
                      <li>Market the Platform to potential customers</li>
                      <li>Provide Partner with access to necessary tools and resources</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">5. Commission Structure</h3>
                    <p>The Partner will set the commission structure for products or services sold through the Platform. The Platform will earn the agreed commission on each sale. Commission rates may vary by product category and will be documented in the Partner's account dashboard.</p>
                    <p className="mt-2">Payment terms:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Commission calculation will be based on the final sale price excluding taxes and shipping</li>
                      <li>Commissions will be calculated monthly</li>
                      <li>The Platform will provide a monthly sales report</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">6. Term and Termination</h3>
                    <p>This Agreement begins on the date of acceptance and continues until terminated by either party with 30 days written notice. The Platform reserves the right to terminate the Agreement immediately for violations of terms.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">7. Intellectual Property</h3>
                    <p>Each party retains all rights to its intellectual property. The Partner grants the Platform a license to use Partner's trademarks, logos, and product images for marketing purposes related to the Platform.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">8. Confidentiality</h3>
                    <p>Both parties agree to maintain the confidentiality of any proprietary information shared during the partnership and for a period of two years following termination.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">9. Limitation of Liability</h3>
                    <p>Neither party shall be liable for any indirect, incidental, special, consequential, or punitive damages resulting from this Agreement, exceeding the total commissions paid or payable in the twelve months preceding the claim.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">10. Dispute Resolution</h3>
                    <p>Any disputes arising from this Agreement shall first be addressed through good faith negotiation between the parties. If resolution cannot be reached, disputes will be resolved through arbitration in accordance with the laws of Canada.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">11. Amendments</h3>
                    <p>The Platform may amend this Agreement with 30 days written notice to the Partner. Continued use of the Platform after the notice period constitutes acceptance of the amendments.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-medium mb-2">12. Entire Agreement</h3>
                    <p>This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements, understandings, or negotiations.</p>
                  </section>
                </div>
              </ScrollArea>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="accept" 
                    checked={accepted}
                    onCheckedChange={(checked) => setAccepted(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="accept">
                      I have read and agree to the Partner Agreement
                    </Label>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button variant="outline" onClick={() => navigate('/partners')}>
                    Return to Partners Page
                  </Button>
                  <Button onClick={handleAccept}>
                    Accept and Continue
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground mt-4 flex items-start">
                  <AlertCircle className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>This agreement is legally binding. We recommend consulting with your legal advisor before accepting.</p>
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

export default PartnerAgreement;
