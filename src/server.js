import express from 'express'
import logger from './middlewares/loggerMiddleware.js'
import authRouter from './routers/authRouter.js'
import adminRouteur from './routers/adminRouter.js'
import collectionRouter from './routers/collectionRouter.js'
import flashcardRouter from './routers/flashcardRouter.js'
import whoamiRouter from './routers/whoamiRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)
app.use('/auth', authRouter)
app.use('/admin', adminRouteur)
app.use('/collections', collectionRouter)
app.use('/whoami', whoamiRouter)
app.use('/flashcards', flashcardRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})