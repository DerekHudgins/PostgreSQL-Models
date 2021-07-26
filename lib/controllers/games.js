import { Router } from 'express';
import Game from '../models/Game.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const game = await Game.insert(req.body);

      res.send(game);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await Game.getById(id);

      res.send(game);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const games = await Game.getAll();

      res.send(games);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, gameSystem, genre } = req.body;

      const updatedGame = await Game.updateById(id, { title, gameSystem, genre });

      res.send(updatedGame);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await Game.getById(id);

      res.send({
        message: `${game.title} has been deleted`
      });
    } catch(err) {
      next(err);
    }
  });

