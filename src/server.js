import express from 'express'
import logger from './middlewares/loggerMiddleware.js'
import authRouter from './routers/authRouter.js'
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})