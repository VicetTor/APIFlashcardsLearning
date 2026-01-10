import { Router } from "express"
import { whoami } from "../controllers/whoamiController.js"
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticateToken)

/*------------------GET------------------*/ 
router.get('/', whoami)

export default router