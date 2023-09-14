import { BRAZIL_PHONE_NUMBER_REGEX } from '@common/contants';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: 'A name must be provided' }),
  email: z
    .string({ required_error: 'A email must be provided' })
    .email('A valid email must be provided'),
  password: z.string({ required_error: 'A password must be provided' }).min(8),
  password_confirm: z
    .string({ required_error: 'A password confirm must be provided' })
    .min(8),
  phone_number: z
    .string({ required_error: 'A phone number must be provided' })
    .regex(BRAZIL_PHONE_NUMBER_REGEX, 'Invalid phone number'),
});
