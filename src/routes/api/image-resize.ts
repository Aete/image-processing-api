import fs from 'fs';
import path from 'path';
import express from 'express';
import { imageResizer } from '../../utilities/imageResizer';

// express route
const imageResize = express.Router();

imageResize.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { filename, height, width } = req.query;
    const name = (filename as string).split('.')[0];
    const targetImgFile = `${name}_${width}_${height}.png`;
    const targetDir = `../../../assets/resized`;

    if (!(filename && height && width)) res.status(400);
    else {
      // add caching for an existing image
      await fs.readdir(
        path.join(__dirname, targetDir),
        async (err, files): Promise<void> => {
          if (files.find(file => file === targetImgFile)) {
            res.sendFile(path.join(__dirname, `${targetDir}/${targetImgFile}`));
          } else {
            await imageResizer({
              width: parseInt(width as string),
              height: parseInt(height as string),
              input: filename as string
            });
            res.sendFile(path.join(__dirname, `${targetDir}/${targetImgFile}`));
          }
        }
      );
    }
    res.send(
      'there is a problem to process your request, plz recheck the query'
    );
  }
);

export default imageResize;
