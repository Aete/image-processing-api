import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';

import { validateFilename, validateSize } from '../utilities/validateParams';
import { imageResizer } from '../utilities/imageResizer';

const request = supertest(app);

// Endpoint Testing

describe('Test status of responses from the endpoints', (): void => {
  it('Should Be ok: endpoint: /', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Should Be ok: endpoint: /api', async (): Promise<void> => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('Should Be ok - with parameters: endpoint: /api/image-resize', async (): Promise<void> => {
    const response = await request.get(
      '/api/image-resize?width=300&height=500&filename=cat2.jpg'
    );
    expect(response.status).toBe(200);
  });

  it('Should Be ok - with parameters: endpoint: /api/placeholder?height=300&width=600', async (): Promise<void> => {
    const response = await request.get('/api/placeholder?height=300&width=600');
    expect(response.status).toBe(200);
  });

  it('Should Be ok: endpoint: /fail', async (): Promise<void> => {
    const response = await request.get('/fail');
    expect(response.status).toBe(404);
  });
});

describe('Testing file handling with api', (): void => {
  it('Should Be ok - image-resize: file content type should be an image', async () => {
    const response = await request.get(
      '/api/image-resize?width=300&height=500&filename=cat2.jpg'
    );
    expect(response.header['content-type']).toBe('image/png');
  });

  it('Should Be ok - image-resize with wrong parameter', async () => {
    const response = await request.get(
      '/api/image-resize?width=-300&height=500&filename=cat2.jpg'
    );
    expect(response.text).toBe('please write a validated size or filename');
  });

  it('Should Be ok - placeholder: file content type should be an image', async () => {
    const response = await request.get('/api/placeholder?width=300&height=500');
    expect(response.header['content-type']).toBe('image/png');
  });

  it('Should Be ok - placeholder: file content type should be an image', async () => {
    const response = await request.get(
      '/api/placeholder?width=-300&height=500'
    );
    expect(response.text).toBe('please write a validated size');
  });
});

describe('Testing utils', (): void => {
  it('should Be ok - wrong width: character', () => {
    const result = validateSize('apt');
    expect(result).toBe(false);
  });

  it('should Be ok - wrong width - negative int', () => {
    const result = validateSize('-300');
    expect(result).toBe(false);
  });

  it('should Be ok - correct width', () => {
    const result = validateSize('300');
    expect(result).toBe(true);
  });

  it('should Be ok - wrong filename', () => {
    const result = validateFilename('seunggyun.jpg');
    expect(result).toBe(false);
  });

  it('should Be ok - correct filename', () => {
    const result = validateFilename('cat2.jpg');
    expect(result).toBe(true);
  });

  it('should Be ok - image resize', async () => {
    imageResizer({ width: 400, height: 400, input: 'cat2.jpg' }).then(() => {
      const files = fs.readdirSync(
        path.join(__dirname, '../../assets/resized')
      );
      const result =
        files.find(file => file === 'cat2_400_400.png') !== undefined
          ? true
          : false;
      expect(result).toBe(true);
    });
  });
});
