import fs from 'fs';
import path from 'path';
import express from 'express';
import { imageResizer } from '../../utilities/imageResizer';
import { validateSize, validateFilename } from '../../utilities/validateParams';

// express route
const imageResize = express.Router();

imageResize.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { filename, height, width } = req.query;

    if (
      !(
        validateFilename(filename as string) &&
        validateSize(height as string) &&
        validateSize(width as string)
      )
    )
      res.send('please write a validated size or filename');
    else {
      const name = (filename as string).split('.')[0];
      const targetImgFile = `${name}_${width}_${height}.png`;
      const targetDir = `../../../assets/resized`;

      // add caching for an existing image
      try {
        await fs.readdir(
          path.join(__dirname, targetDir),
          async (err, files): Promise<void> => {
            if (files.find(file => file === targetImgFile)) {
              res.sendFile(
                path.join(__dirname, `${targetDir}/${targetImgFile}`)
              );
            } else {
              await imageResizer({
                width: parseInt(width as string),
                height: parseInt(height as string),
                input: filename as string
              });
              res.sendFile(
                path.join(__dirname, `${targetDir}/${targetImgFile}`)
              );
            }
          }
        );
      } catch {
        res.send('there were problems to handle your query.');
      }
    }
  }
);

export default imageResize;
