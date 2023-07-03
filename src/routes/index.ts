import express from 'express';

import imageResize from './api/image-resize';
import placeholder from './api/placeholder';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('main api routes');
});

routes.use('/image-resize', imageResize);
routes.use('/placeholder', placeholder);

export default routes;
