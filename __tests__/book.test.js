import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Book from '../lib/models/Book.js';


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
  it('gets a book by id ', async () => {
    const hitch = await Book.insert ({ 
      title: 'The Hitchhikes Guide To The Galaxy', 
      author: 'Adams', 
      genre: 'sifi' 
    });
    const res = await request(app).get(`/api/v1/books/${hitch.id}`);

    expect(res.body).toEqual(hitch);
  });
  it('gets all books', async () => {
    const hitch = await Book.insert ({ 
      title: 'The Hitchhikes Guide To The Galaxy', 
      author: 'Adams', 
      genre: 'sifi' 
    });

    const breakfeast = await Book.insert({
      title: 'Breakfast of Champions',
      author: 'Vonuget',
      genre: 'comedy/fiction',
    });

    const road = await Book.insert({
      title: 'On The Road',
      author: 'Kerouac',
      genre: 'fiction',
    });

    return request(app)
      .get('/api/v1/books')
      .then((res) => {
        expect(res.body).toEqual([hitch, breakfeast, road]);
      });
  });
  it('updates a book by id', async () => {
    const breakfeast = await Book.insert({
      title: 'Breakfast of Champions',
      author: 'Vonuget',
      genre: 'comedy/fiction',
    });

    const res = await request(app)
      .put(`/api/v1/books/${breakfeast.id}`)
      .send({ title: 'Dinner of losers'  });

    expect(res.body).toEqual({ ...breakfeast, title: 'Dinner of losers' });
  });
});
