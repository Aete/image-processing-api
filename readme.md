# Image Processing API

As part of the Udacity Full Stack JavaScript Nanodegree, I created an image processing API. This API provides functionality to resize images and generate placeholder images of desired sizes.

The image processing API allows users to resize images, adjusting their dimensions according to specific requirements. It provides the flexibility to specify the desired width and height for the resized image, ensuring it meets the desired size criteria.

Additionally, the API offers the capability to generate placeholder images. Placeholder images are temporary image representations used when the actual image is not available or when creating prototypes. By specifying the desired dimensions, the API can generate a placeholder image of the specified size, which can be used as a substitute until the actual image is obtained or generated.

## npm Scripts

install: `npm install`
start server: `npm start`
build: `npm run build`
unit test: `npm run test`
lint: `npm run lint`
formatting: `npm run prettify`

## How to use?

after starting server (`npm start`), you can use two apis

### image-resize

`https://localhost:3000/api/image-resize?filename=FILENAME&width=WIDTH&height=HEIGHT`

### placeholder

`https://localhost:3000/api/image-resize?width=WIDTH&height=HEIGHT`
