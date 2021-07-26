import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a movie from POST', async () => {
    const hitch = { 
      title: 'The Hitchhikes Guide To The Galaxy', 
      author: 'Adams', 
      genre: 'Sifi' 
    };
  
    const res = await request(app)
      .post('/api/v1/books')
      .send(hitch);
      
    expect(res.body).toEqual({
      id: '1',
      ...hitch
    });
  });
});
