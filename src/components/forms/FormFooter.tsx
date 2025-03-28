
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter = ({ isSubmitting }: FormFooterProps) => {
  return (
    <>
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
    </>
  );
};

export default FormFooter;
