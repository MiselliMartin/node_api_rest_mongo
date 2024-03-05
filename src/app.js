import express from 'express'
import dot_env from 'dotenv'
import mongoose, { mongo } from 'mongoose'
import bodyParser from 'body-parser'
import { router as bookRouter } from './routes/book.routes.js'
dot_env.config()

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection

app.use('/books', bookRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})