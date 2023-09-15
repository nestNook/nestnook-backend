import { MAX_ACCESS_LEVEL, MIN_ACCESS_LEVEL } from '@common/constants';
import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string({ required_error: 'A role name must be provided' }).min(3),
  description: z
    .string({ required_error: 'A role name description be provided' })
    .min(3),
  access_level: z
    .number({ required_error: 'A role access level must be provided' })
    .int('A role access level must be a non negative integer between 0 and 3')
    .min(MIN_ACCESS_LEVEL, 'A access level must be greater than or equal 0')
    .max(MAX_ACCESS_LEVEL, 'A access level must be less than or equal 3'),
});
