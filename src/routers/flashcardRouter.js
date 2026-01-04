import { Router } from "express"
import { getFlashcardById, getFlashcardsByCollection, getFlashcardsToReviewByCollection, createFlashcard, editFlashcardById, deleteFlashcardById } from "../controllers/flashcardController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'
import { validateBody } from "../middlewares/validationMiddleware.js"
import { createFlashcardSchema, editFlashcardSchema } from "../models/flashcardModel.js"

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/:id', getFlashcardById)
router.get('/collection/:id', getFlashcardsByCollection)
// router.get('/collection/:id/review', getFlashcardsToReviewByCollection)

/*------------------POST------------------*/ 
router.post('/', validateBody(createFlashcardSchema), createFlashcard)
router.post('/edit/:id', validateBody(editFlashcardSchema), editFlashcardById)

/*------------------POST------------------*/ 
// router.patch('/flashcard/:')

/*------------------DELETE------------------*/ 
router.delete('/:id', deleteFlashcardById)

export default router