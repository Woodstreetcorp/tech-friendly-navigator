
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { UserInfoFormValues } from './userInfoFormSchema';

interface FormFieldsProps {
  form: UseFormReturn<UserInfoFormValues>;
}

export const NameField = ({ form }: FormFieldsProps) => (
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
);

export const EmailField = ({ form }: FormFieldsProps) => (
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
);

export const PhoneField = ({ form }: FormFieldsProps) => (
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
);

export const PostalCodeField = ({ form }: FormFieldsProps) => (
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
);

export const ConsentField = ({ form }: FormFieldsProps) => (
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
);
