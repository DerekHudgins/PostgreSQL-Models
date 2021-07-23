import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat';

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat from post', async () => {
    const garfield = { name: 'garfeild', age: 15, favoriteFood: 'lassagna' };
    const res = await request(app).post('/api/v1/cats').send(garfield);

    expect(res.body).toEqual({
      id: '1',
      ...garfield
    });
  });

  it('gets a cat by id from get', async () => {
    const tom = await Cat.insert({
      name: 'tom',
      age: 10,
      favoriteFood: 'mice',
    });

    const res = await request(app).get(`/api/v1/cats/${tom.id}`);
    
    expect(res.body).toEqual(tom);
  });
});
