import {z} from "zod";

export const packageDto = z.object({
    name: z.string().min(1),
    description: z.string().min(10).default("This is a new package"),
    user: z.string(),
    price: z.number(),
    currency: z.enum(["USD", "INR"]).default("USD"),
    gig: z.string(),
});