import { Router } from "express"
import  {getAllUsers, getAllUsersById, deleteUser} from "../controllers/adminController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)


router.get('/users', getAllUsers)
router.get('/users/:id', getAllUsersById)

/*-------------------DELETE-------------------*/
router.delete('/users/:idUserToDelete', deleteUser)

export default router