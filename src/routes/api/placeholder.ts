import express from 'express';

const placeholder = express.Router();

placeholder.get('/', (req, res): void => {
  const { height, width } = req.query;

  if (!(height && width)) res.status(400);

  res.send('placeholder');
});

export default placeholder;
