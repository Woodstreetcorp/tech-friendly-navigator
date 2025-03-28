
import * as z from 'zod';

export const userInfoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  postalCode: z.string().optional(),
  consentToMarketing: z.boolean().default(false),
});

export type UserInfoFormValues = z.infer<typeof userInfoFormSchema>;
