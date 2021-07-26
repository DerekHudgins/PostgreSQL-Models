import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Movie from '../lib/models/Movie.js';

describe('Movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a movie from POST', async () => {
    const royal = { 
      title: 'The Royal Tenenbaums', 
      director: 'Wes Anderson', 
      genre: 'comedy-drama' 
    };
  
    const res = await request(app)
      .post('/api/v1/movies')
      .send(royal);
      
    expect(res.body).toEqual({
      id: '1',
      ...royal
    });
  });
  it('gets a movie by id ', async () => {
    const life = await Movie.insert ({ 
      title: 'Life Auqatic', 
      director: 'Wes Anderson', 
      genre: 'comedy-drama' 
    });
    const res = await request(app).get(`/api/v1/movies/${life.id}`);

    expect(res.body).toEqual(life);
  });
  it('gets all movies', async () => {
    const life = await Movie.insert({
      title: 'The Life Aquatic ',
      director: 'Wes Anderson',
      genre: 'comedy-drama',
    });

    const darjeeling = await Movie.insert({
      title: 'the Darjeeling Limited',
      director: 'Wes Anderson',
      genre: 'comedy-drama',
    });

    const royal = await Movie.insert({
      title: 'The Royal Tenenbaums',
      director: 'Wes Anderson',
      genre: 'comedy-drama',
    });

    return request(app)
      .get('/api/v1/movies')
      .then((res) => {
        expect(res.body).toEqual([life, darjeeling, royal]);
      });
  });
  it('updates a movie by id', async () => {
    const darjeeling = await Movie.insert({
      title: 'the Darjeeling Limited',
      director: 'Wes Anderson',
      genre: 'comedy-drama',
    });

    const res = await request(app)
      .put(`/api/v1/movies/${darjeeling.id}`)
      .send({ title: 'Owen Wilson in his prime' });

    expect(res.body).toEqual({ ...darjeeling, title: 'Owen Wilson in his prime' });
  });
});
