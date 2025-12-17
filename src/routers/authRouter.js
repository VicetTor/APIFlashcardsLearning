import { Router } from "express"
import { validateBody } from "../middlewares/validationMiddleware.js"
import { loginSchema, registerSchema } from "../models/authModel.js"
import { register, login } from "../controllers/authController.js"

const router = Router()

router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router