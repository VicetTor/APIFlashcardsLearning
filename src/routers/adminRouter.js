import { Router } from "express"
import  {getAllUsers, getUserById, deleteUser} from "../controllers/adminController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/users', getAllUsers)
router.get('/:id', getUserById)

/*-------------------DELETE-------------------*/
router.delete('/users/:idUserToDelete', deleteUser)

export default router