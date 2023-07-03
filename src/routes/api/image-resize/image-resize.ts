import fs from 'fs';
import express from 'express';
import sharp from 'sharp';

interface Image {
  width: number;
  height: number;
  input: string;
  output: string;
}

// express route
const imageResize = express.Router();

// function for image resizing
const imageResizer = async (img: Image): Promise<string> => {
  // setup
  const { width, height, input, output } = img;

  // resizing
  try {
    await sharp(input).resize(width, height).toFormat('png').toFile(output);
    return 'Success!';
  } catch {
    return 'Failed to resize the image';
  }
};

imageResize.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const { filename, height, width } = req.query;
  res.send(`filename is ${filename}, height is ${height}, width is ${width}`);
});

export default imageResize;
