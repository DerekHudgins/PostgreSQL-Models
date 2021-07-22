import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat from post', async () => {
    const garfield = { name: 'garfeild', age: 15, favoriteFood: 'lassagna' };
    const res = await (await request(app).post('/api/v1/cats')).setEncoding(garfield);

    expect(res.body).toEqual({
      id: '1',
      ...garfield
    });
  });
});
