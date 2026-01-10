import { z } from 'zod'

export const createCollectionSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(255, 'Collection title must be at most 255 characters'),
    description: z
        .string()
        .max(255, 'Collection description must be at most 255 characters')
        .optional(),
    isPublic: z
        .boolean()
})

export const editCollectionSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(255, 'Collection title must be at most 255 characters')
        .optional(),
    description: z
        .string()
        .min(1)
        .max(255, 'Collection description must be at most 255 characters')
        .optional(),
    isPublic: z
        .boolean()
        .optional()
})