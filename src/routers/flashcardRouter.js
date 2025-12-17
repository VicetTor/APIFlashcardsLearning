import { Router } from "express"
import { getAllFlashCardsFromCollection, createFlashCardInCollection } from "../controllers/flashcardController.js"

const router = Router()

router.get('/:id', getAllFlashCardsFromCollection)
router.post('/:id', createFlashCardInCollection)

export default router