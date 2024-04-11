import express from 'express';
import { BookStore } from '../models/bookModel.js';
const app = express();
app.use(express.json());

const router = express.Router();

// GET all books with added count in the response
router.get('/', async (req, res) => {
    try {
        const books = await BookStore.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// POST a new book with validation for required fields
router.post('/', async (req, res) => {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
        return res.status(400).send({
            message: 'Missing required fields: title, author, publishYear',
        });
    }

    try {
        const newBook = { title, author, publishYear };
        const book = await BookStore.create(newBook);
        return res.status(201).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// GET a book by ID, with proper error handling for not found
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookStore.findById(id);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        return res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// PUT route to update a book's details by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await BookStore.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        return res.status(200).json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
// DELETE route to remove a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await BookStore.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        return res.status(200).send(`Book deleted successfully`);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

export default router;