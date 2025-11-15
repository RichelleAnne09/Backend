import * as BookController from  '../controllers/BookController.js';
import express from "express";


const bookRoutes = express.Router();

bookRoutes.get('/all', BookController.fetchBooks);
bookRoutes.post('/new',BookController.createBooks);
bookRoutes.put('/edit/:bookId',BookController.editBook);
bookRoutes.delete('/delete/:bookId',BookController.deleteBook);



export default bookRoutes;