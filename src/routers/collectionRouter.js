import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle, getMyCollection, updateCollection, deleteCollection} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'
import { validateBody } from "../middlewares/validationMiddleware.js"
import { collectionSchema } from "../models/collectionModel.js"

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/mine', getMyCollection)
router.get('/:idCollection', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/', validateBody(collectionSchema), createCollection)

/*------------------UPDATE------------------*/
router.put('/:idCollection', updateCollection)

/*------------------DELETE------------------*/
router.delete('/:idCollection', deleteCollection)

export default router