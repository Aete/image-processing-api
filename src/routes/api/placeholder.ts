import express from 'express';
import { imageResizer } from '../../utilities/imageResizer';
import path from 'path';

const placeholder = express.Router();

const filename = 'cat.jpg';

placeholder.get('/', async (req, res): Promise<void> => {
  const { height, width } = req.query;

  if (!(height && width)) res.status(400);
  else {
    const name = (filename as string).split('.')[0]
    await imageResizer({ width: parseInt(width as string), height: parseInt(height as string), input: filename as string });
    res.sendFile(path.join(__dirname, `../../../../assets/resized/${name}_${width}_${height}.png`));
  }
});

export default placeholder;
