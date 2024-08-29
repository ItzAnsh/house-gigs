import { z } from 'zod';

export const UserCreationDto = z.object({
  name: z.string().min(3).max(250).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty().min(8).max(128),
  role: z.enum(['gigster', 'user']),
});
