import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Movie from '../lib/models/Movie';

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a game from POST', async () => {
    const royal = { title: 'WThe Royal Tenenbaums', director: 'Wes Anderson', genre: 'comedy-drama' };
  
    const res = await request(app)
      .post('/api/v1/movies')
      .send(royal);
      
    expect(res.body).toEqual({
      id: '1',
      ...royal
    });
  });
});
