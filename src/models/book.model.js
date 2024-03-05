import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: String,
    publication_date: String
})

const Book = mongoose.model('Book', bookSchema);

export default Book;