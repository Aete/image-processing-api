import express from 'express';
import routes from './routes';

const app: express.Application = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Server is running.');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
