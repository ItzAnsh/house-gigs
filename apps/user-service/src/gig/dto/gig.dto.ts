import {z} from 'zod';

export const GigDto = z.object({
  name: z.string().regex(/^(?!.*\s\s\s)[^\s]{1,18}(\s[^\s]{1,18}){0,2}$/),
  description: z.string().default('This is a gig'),
  gigsterCount: z.number().default(0),
  rating: z.number().default(0),
});