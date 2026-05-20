import { z } from 'zod'

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(20),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
})
