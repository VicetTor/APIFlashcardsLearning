import { z } from 'zod'

export const collectionSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(255, 'Collection title must be at most 255 characters'),
    description: z
        .string()
        .min(1)
        .max(255, 'Collection description must be at most 255 characters'),
    isPublic: z
        .boolean()
})
