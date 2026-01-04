import { z } from 'zod'

export const createFlashcardSchema = z.object({
    front: z.string().min(1),
    back: z.string().min(1),
    urlFront: z.string().optional(),
    urlBack: z.string().optional(),
    collectionId: z.string()
})

export const editFlashcardSchema = z.object({
    front: z.string().min(1).optional(),
    back: z.string().min(1).optional(),
    urlFront: z.string().optional(),
    urlBack: z.string().optional()
})
