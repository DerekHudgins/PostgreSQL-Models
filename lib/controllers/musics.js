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
  });
