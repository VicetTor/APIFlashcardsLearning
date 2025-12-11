import { Router } from "express"
import { getAllFlashCardsFromCollection } from "../controllers/flashcardController.js"

const router = Router()

router.get('/:id', getAllFlashCardsFromCollection)

export default router