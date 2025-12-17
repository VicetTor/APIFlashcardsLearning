import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/:idCollection', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/:idUser', createCollection)

export default router