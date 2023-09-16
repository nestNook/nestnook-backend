import { BRAZIL_PHONE_NUMBER_REGEX } from '@common/constants';
import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string({ required_error: 'A name must be provided' }),
  email: z
    .string({ required_error: 'A email must be provided' })
    .email('A valid email must be provided'),
  phone_number: z
    .string({ required_error: 'A phone number must be provided' })
    .regex(BRAZIL_PHONE_NUMBER_REGEX, 'Invalid phone number'),
});
