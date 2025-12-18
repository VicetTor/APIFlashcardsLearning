import { Router } from "express"
import  {getAllUsers} from "../controllers/adminController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)


router.get('/users', getAllUsers)
router.get('/users:id', getAllUsers)

export default router