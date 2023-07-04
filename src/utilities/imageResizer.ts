import sharp from 'sharp';

interface Image {
  width: number;
  height: number;
  input: string;
}

const inputDir = './assets/origin/';
export const outputDir = './assets/resized/';

// function for image resizing
export const imageResizer = async (img: Image): Promise<void> => {
  // setup
  const { width, height, input } = img;
  const name = input.split('.')[0];

  // resizing
  try {
    await sharp(`${inputDir}${input}`)
      .resize(width, height)
      .toFormat('png')
      .toFile(`${outputDir}${name}_${width}_${height}.png`);
  } catch (err) {
    console.log(err);
  }
};
