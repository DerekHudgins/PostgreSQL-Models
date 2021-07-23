import { Router } from 'express';
import Cat from '../models/Cat';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const cat = await Cat.insert(req.body);

      res.send(cat);
        
    } catch (err) {
      next(err);
        
    }
  });
