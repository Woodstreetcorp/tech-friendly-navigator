
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  postalCode: z.string().optional(),
  consentToMarketing: z.boolean().default(false),
});

type UserInfoFormProps = {
  onClose: () => void;
  onComplete: () => void;
  productName?: string;
  providerName?: string;
  affiliateUrl?: string;
};

const UserInfoForm = ({ 
  onClose, 
  onComplete, 
  productName, 
  providerName,
  affiliateUrl 
}: UserInfoFormProps) => {
  const { setUserData, trackEvent } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      postalCode: '',
      consentToMarketing: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Save user data
      setUserData({
        name: values.name,
        email: values.email,
        phone: values.phone,
        postalCode: values.postalCode,
        consentToMarketing: values.consentToMarketing,
      });
      
      // Track the form submission event
      trackEvent({
        eventType: 'form_submission',
        productName: productName,
        providerName: providerName,
        source: 'user_info_form',
      });
      
      toast.success('Information saved successfully!');
      onComplete();
      
      // If we have an affiliate URL, open it after a short delay
      if (affiliateUrl) {
        setTimeout(() => {
          window.open(affiliateUrl, '_blank');
        }, 500);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      toast.error('There was a problem saving your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {productName ? `Get the best deal on ${productName}` : 
               providerName ? `Connect with ${providerName}` : 
               'Complete your information'}
            </h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {productName || providerName ? 
              `Please provide your information to proceed. We'll send you exclusive offers and connect you with the best deals.` : 
              `Please provide your information to get personalized recommendations and exclusive offers.`
            }
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 555-5555" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="A1A 1A1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consentToMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Send me special offers and updates
                      </FormLabel>
                      <FormDescription>
                        We'll never spam you or share your information.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy.
                We use your information to provide the best recommendations and connect you with service providers.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
