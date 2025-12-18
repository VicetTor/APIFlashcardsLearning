import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle, getMyCollection, updateCollection, deleteCollection} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/mine', getMyCollection)
router.get('/:idCollection', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/', createCollection)

/*------------------UPDATE------------------*/
router.put('/:idCollection', updateCollection)

/*------------------DELETE------------------*/
router.delete('/:idCollection', deleteCollection)

export default router