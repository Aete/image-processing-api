import express from 'express';

const placeholder = express.Router();

placeholder.get('/', (req, res): void => {
  console.log('visit placeholder');
  res.send('placeholder');
});

export default placeholder;
