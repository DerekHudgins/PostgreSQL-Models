import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Music from '../lib/models/Music.js';


describe('music routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a band from POST', async () => {
    const Boy = { 
      artist: 'Boy Harsher', 
      album: 'Careful', 
      song: 'DarkWave' 
    };
  
    const res = await request(app)
      .post('/api/v1/music')
      .send(Boy);
      
    expect(res.body).toEqual({
      id: '1',
      ...Boy
    });
  });
  it('gets a band by id ', async () => {
    const boy = await Music.insert ({ 
      artist: 'Boy Harshe', 
      album: 'Careful', 
      song: 'fate' 
    });
    const res = await request(app).get(`/api/v1/music/${boy.id}`);

    expect(res.body).toEqual(boy);
  });
});
