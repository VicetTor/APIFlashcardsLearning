import { Router } from "express"
import { createCollection, getCollectionById, getCollectionByTitle} from "../controllers/collectionController.js"

const router = Router()

/*------------------GET------------------*/ 
router.get('/:idCollection', getCollectionById)
router.get('/title/:title', getCollectionByTitle)

/*------------------POST-----------------*/
router.post('/:idUser', createCollection)


export default router