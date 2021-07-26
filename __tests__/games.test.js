import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game.js';

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a game from POST', async () => {
    const warcraft = { title: 'World of Warcraft', gameSystem: 'pc', genre: 'mmo' };
  
    const res = await request(app)
      .post('/api/v1/games')
      .send(warcraft);
      
    expect(res.body).toEqual({
      id: '1',
      ...warcraft
    });
  });

  it('gets a game by id', async () => {
    const fallout = await Game.insert({
      title: 'fallout',
      gameSystem: 'all',
      genre: 'rpg',
    });

    const res = await request(app).get(`/api/v1/games/${fallout.id}`);

    expect(res.body).toEqual(fallout);
  });
  it('gets all games', async () => {
    const fallout = await Game.insert({
      title: 'fallout',
      gameSystem: 'all',
      genre: 'rpg',
    });

    const halo = await Game.insert({
      title: 'Halo',
      gameSystem: 'xbox/pc',
      genre: 'fps',
    });

    const darkSouls = await Game.insert({
      title: 'Dark Souls',
      gameSystem: 'all',
      genre: 'rpg',
    });

    return request(app)
      .get('/api/v1/games')
      .then((res) => {
        expect(res.body).toEqual([fallout, halo, darkSouls]);
      });
  });
});
