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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const cat = await Cat.getById(id);

      res.send(cat);
    } catch (err) {
      next(err);
    }
  });

