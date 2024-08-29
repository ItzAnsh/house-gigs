import { z } from 'zod';

export const gigsterDTO = z.object({
  userId: z.string(),
  gigId: z.string(),
  slotTimings: z.array(z.string()),
  packages: z.array(z.string()),
  available: z.boolean().default(true),
});
