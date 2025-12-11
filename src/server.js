import express from 'express'
import flashcardRouter from './routers/flashcardRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/flashcards/collection', flashcardRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})