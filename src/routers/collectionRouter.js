import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle, getMyCollection, updateCollection} from "../controllers/collectionController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/mine', getMyCollection)
router.get('/:idCollection', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/:idUser', createCollection)

/*------------------DELETE------------------*/

router.put('/:idCollection', updateCollection)

export default router