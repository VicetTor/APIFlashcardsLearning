import { Router } from "express"
import { createCollection, getAllCollection  } from "../controllers/collectionController.js"
// import { validateBody } from "../middleware/validation.js"
import { collection } from "../models/collectionModel.js"

const router = Router()

router.get("/collection", getAllCollection)