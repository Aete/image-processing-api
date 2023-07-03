import express from 'express';

const imageResize = express.Router();

imageResize.get('/', (req, res): void => {
  console.log('visit imageResize');
  res.send('imageResize');
});

export default imageResize;
