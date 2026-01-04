import { Router } from "express"
import  {getAllUsers, deleteUser} from "../controllers/adminController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)


router.get('/users', getAllUsers)

/*-------------------DELETE-------------------*/
router.delete('/users/:idUserToDelete', deleteUser)

export default router