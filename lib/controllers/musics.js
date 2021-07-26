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
  })
  .get('/', async (req, res, next) => {
    try {
      const music = await Music.getAll();

      res.send(music);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { artist, album, song } = req.body;

      const updatedBand = await Music.updateById(id, { artist, album, song });

      res.send(updatedBand);
    } catch (err) {
      next(err);
    }
  });
