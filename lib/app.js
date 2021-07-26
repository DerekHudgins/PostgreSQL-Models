import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import catsController from './controllers/cats';
import gamesController from './controllers/games';

const app = express();

app.use(express.json());
app.use('/api/v1/cats', catsController);
app.use('/api/v1/games', gamesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
