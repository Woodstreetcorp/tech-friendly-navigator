
import * as z from 'zod';

export const userInfoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  postalCode: z.string().min(3, 'Please enter a valid postal code').optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  interestLevel: z.enum(['researching', 'planning', 'ready-to-buy']).optional(),
  budget: z.enum(['under-500', '500-1000', '1000-2000', 'over-2000']).optional(),
  consentToMarketing: z.boolean().default(false),
});

export type UserInfoFormValues = z.infer<typeof userInfoFormSchema>;

// Interest level options for dropdown
export const interestLevelOptions = [
  { value: 'researching', label: 'Just researching' },
  { value: 'planning', label: 'Planning to buy soon' },
  { value: 'ready-to-buy', label: 'Ready to buy now' },
];

// Budget range options for dropdown
export const budgetOptions = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2000', label: '$1,000 - $2,000' },
  { value: 'over-2000', label: 'Over $2,000' },
];
