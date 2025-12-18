import { z } from 'zod'

export const registerSchema = z.object({
    mail: z.email(),
    firstName: z
    .string()
    .min(2)
    .max(30),
    lastName: z
    .string()
    .min(2)
    .max(30),
    password: z
    .string()
    .min(8),
    isAdmin: z
    .boolean()
})

export const loginSchema = z.object({
    mail: z.email(),
    password: z
    .string()
    .min(8)
})