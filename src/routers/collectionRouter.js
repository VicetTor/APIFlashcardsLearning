import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle, getMyCollections, updateCollection, deleteCollection} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'
import { validateBody } from "../middlewares/validationMiddleware.js"
import { createCollectionSchema, editCollectionSchema } from "../models/collectionModel.js"

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/mine', getMyCollections)
router.get('/:id', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/', validateBody(createCollectionSchema), createCollection)

/*------------------UPDATE------------------*/
router.put('/:idCollection', validateBody(editCollectionSchema), updateCollection)

/*------------------DELETE------------------*/
router.delete('/:idCollection', deleteCollection)

export default router