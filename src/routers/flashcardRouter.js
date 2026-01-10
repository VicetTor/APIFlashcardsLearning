import { Router } from "express"
import { getFlashcardById, getFlashcardsByCollection, getFlashcardsToReviewByCollection, createFlashcard, editFlashcardById, reviewFlashcardById, deleteFlashcardById } from "../controllers/flashcardController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'
import { validateBody } from "../middlewares/validationMiddleware.js"
import { createFlashcardSchema, editFlashcardSchema } from "../models/flashcardModel.js"

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/:id', getFlashcardById)
router.get('/collection/:id', getFlashcardsByCollection)
router.get('/collection/:id/review', getFlashcardsToReviewByCollection)

/*------------------POST------------------*/ 
router.post('/', validateBody(createFlashcardSchema), createFlashcard)

/*------------------PATCH------------------*/ 
router.patch('/:id', validateBody(editFlashcardSchema), editFlashcardById)
router.patch('/:id/review', reviewFlashcardById)

/*------------------DELETE------------------*/ 
router.delete('/:id', deleteFlashcardById)

export default router