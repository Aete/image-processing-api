import fs from 'fs';
import express from 'express';
import sharp from 'sharp';

interface Image {
  width: number | null;
  height: number | null;
  input: string | null;
}

// express route
const imageResize = express.Router();

const outputDir = '../../../assets/resized';

// function for image resizing
const imageResizer = async (img: Image): Promise<string> => {
  // setup
  const { width, height, input } = img;

  // resizing
  try {
    await sharp(input as string).resize(width, height).toFormat('png').toFile(outputDir);
    return 'Success!';
  } catch {
    return 'Failed to resize the image';
  }
};

imageResize.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const { filename, height, width } = req.query;

  if (!(filename && height && width)) res.status(400); 

  res.send(`filename is ${filename}, height is ${height}, width is ${width}`);
});

export default imageResize;
