import { Router } from 'express';
import Book from '../models/Book';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);

      res.send(book);
    } catch(err) {
      next(err);
    }
  });
