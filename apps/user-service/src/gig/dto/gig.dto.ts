import {z} from 'zod';

export const GigDto = z.object({
  name: z.string().regex(/^\S+$/),
  description: z.string().default('This is a gig'),
  gigsterCount: z.number().default(0),
    rating: z.number().default(0),
});