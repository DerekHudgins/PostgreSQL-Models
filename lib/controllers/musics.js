import { Router } from 'express';
import Music from '../models/Music';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const music = await Music.insert(req.body);

      res.send(music);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const music = await Music.getById(id);

      res.send(music);
    } catch (err) {
      next(err);
    }
  });
