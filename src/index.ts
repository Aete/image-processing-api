import express, { RequestHandler } from 'express';

const app: express.Application = express();
const port = 3000;

app.get('/', (req, res): void => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
