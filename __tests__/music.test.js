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
      artist: 'Boy Harsher', 
      album: 'Careful', 
      song: 'fate' 
    });
    const res = await request(app).get(`/api/v1/music/${boy.id}`);

    expect(res.body).toEqual(boy);
  });
  it('gets all bands', async () => {
    const boy = await Music.insert ({  
      artist: 'Boy Harsher', 
      album: 'Careful', 
      song: 'fate' 
    });

    const radio = await Music.insert ({  
      artist: 'Radiohead', 
      album: 'In Rainbows', 
      song: 'OK Computer' 
    });

    const car = await Music.insert ({  
      artist: 'Car Seat Headrest', 
      album: 'Teens of Denial', 
      song: 'fill in the blank' 
    });

    return request(app)
      .get('/api/v1/music')
      .then((res) => {
        expect(res.body).toEqual([boy, radio, car]);
      });
  });
  it('updates a band by id', async () => {
    const car = await Music.insert ({  
      artist: 'Car Seat Headrest', 
      album: 'Teens of Denial', 
      song: 'fill in the blank' 
    });

    const res = await request(app)
      .put(`/api/v1/music/${car.id}`)
      .send({ album: 'teens of style' });

    expect(res.body).toEqual({ ...car, album: 'teens of style' });
  });
});
