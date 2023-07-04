import fs from 'fs';
import path from 'path';
import express from 'express';
import { imageResizer} from '../../../utilities/imageResizer';



// express route
const imageResize = express.Router();

imageResize.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const { filename, height, width } = req.query;
  
  if (!(filename && height && width)) res.status(400);
  else {
    const name = (filename as string).split('.')[0]
    await imageResizer({ width: parseInt(width as string), height: parseInt(height as string), input: filename as string });
    res.sendFile(path.join(__dirname, `../../../../assets/resized/${name}_${width}_${height}.png`));
  }
});

export default imageResize;
