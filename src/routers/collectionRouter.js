import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle, getMyCollections} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/mine', getMyCollections)
router.get('/:id', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/:idUser', createCollection)

export default router