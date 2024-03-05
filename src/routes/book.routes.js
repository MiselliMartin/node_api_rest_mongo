import express from 'express';
import Book from '../models/book.model.js';
export const router = express.Router();
const app = express()

const getBook = async (req,res, next) => {
    let book;
    const {id} = req.params
    if(!id.match(/^[0-9a-fA-f]{24}$/)){
        return res.status(404).json({message : 'Invalid book id'})
    }
    try {
        book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({message : 'Book not found'})
        }
    } catch (e) {
        return res.status(500).json({message : e.message})
    }
    res.book = book
    next()
}

router.get('/', async (req, res) => {
    //GET ALL
    try {
        console.log('GET ALL');
        const books = await Book.find();
        if (books.length === 0) {
            return res.status(204).json([])
        }
        res.json(books)
    } catch (e) {
        return res.status(500).json({message : e.message})
    }
})

router.post('/', async (req, res) => {
    //POST
    console.log('POST')
    const { title, author, genre, publication_date } = req?.body
    if (!title || !author || !genre || !publication_date) {
        return res.status(400).json({message : 'Please fill all the fields'})
    }
    const book = new Book({title, author, genre, publication_date})
    try {
        const newBook = await book.save()
        if (newBook) {
            return res.status(201).json(newBook)
        }
    } catch (e) {
        return res.status(500).json({message : e.message})
    }
})

router.get('/:id', getBook, async (req, res) => {
    //GET ONE
    res.json(res.book)
})

router.put('/:id', getBook, async (req, res) => {
    try {
        const book = res.book
        book.title = req.body.title || book.title
        book.author = req.body.author || book.author
        book.genre = req.body.genre || book.genre
        book.publication_date = req.body.publication_date || book.publication_date

        const updatedBook = await book.save()
        if (updatedBook) {
            return res.status(200).json(updatedBook)
        }

    }  catch (e) {
        return res.status(500).json({message : e.message})
    }
})

router.patch('/:id', getBook, async (req, res) => {
    if (! req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date) {
        return res.status(400).json({message : 'Please fill at list one field.'})
    }
    try {
        const book = res.book
        book.title = req.body.title || book.title
        book.author = req.body.author || book.author
        book.genre = req.body.genre || book.genre
        book.publication_date = req.body.publication_date || book.publication_date

        const updatedBook = await book.save()
        if (updatedBook) {
            return res.status(200).json(updatedBook)
        }

    }  catch (e) {
        return res.status(500).json({message : e.message})
    }
})

router.delete('/:id', getBook, async (req, res) => {
    try {
        const book = res.book
        await book.deleteOne({
            _id : book._id
        })
        return res.status(200).json({message: `The book ${book.title} has been succesfully removed`}) 
    } catch (e) {
            return res.status(500).json({message : e.message})
    }
})