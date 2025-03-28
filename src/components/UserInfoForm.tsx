
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userInfoFormSchema, UserInfoFormValues } from './forms/userInfoFormSchema';
import FormHeader from './forms/FormHeader';
import { NameField, EmailField, PhoneField, PostalCodeField, ConsentField } from './forms/FormFields';
import FormFooter from './forms/FormFooter';

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
  const { trackEvent } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      postalCode: '',
      consentToMarketing: false,
    },
  });

  const handleSubmit = async (values: UserInfoFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Save user data to localStorage
      localStorage.setItem('smartHomeUserData', JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        postalCode: values.postalCode,
        consentToMarketing: values.consentToMarketing,
      }));
      
      // Track the form submission event
      trackEvent({
        eventType: 'form_submission',
        productName: productName,
        providerName: providerName,
        source: 'user_info_form',
        url: window.location.href
      });
      
      toast.success('Information saved successfully!');
      onComplete();
    } catch (error) {
      console.error('Error saving user data:', error);
      toast.error('There was a problem saving your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if (productName) return `Get the best deal on ${productName}`;
    if (providerName) return `Connect with ${providerName}`;
    return 'Complete your information';
  };

  const getDescription = () => {
    if (productName || providerName) {
      return `Please provide your information to proceed. We'll send you exclusive offers and connect you with the best deals.`;
    }
    return `Please provide your information to get personalized recommendations and exclusive offers.`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <FormHeader 
            title={getTitle()} 
            description={getDescription()} 
            onClose={onClose} 
          />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <NameField form={form} />
              <EmailField form={form} />
              <PhoneField form={form} />
              <PostalCodeField form={form} />
              <ConsentField form={form} />
              
              <FormFooter isSubmitting={isSubmitting} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
