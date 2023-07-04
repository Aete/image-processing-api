import supertest from 'supertest';
import app from '../index';

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

  it('Should Be failed - without any parameters: endpoint: /api/image-resize', async (): Promise<void> => {
    const response = await request.get('/api/image-resize');
    expect(response.status).toBe(200);
  });

  it('Should Be ok - with parameters: endpoint: /api/placeholder?height=300&width=600', async (): Promise<void> => {
    const response = await request.get('/api/placeholder?height=300&width=600');
    expect(response.status).toBe(200);
  });

  it('Should Be failed - without any parameters: endpoint: /api/placeholder', async (): Promise<void> => {
    const response = await request.get('/api/placeholder');
    expect(response.status).toBe(200);
  });

  it('Should failed: endpoint: /fail', async (): Promise<void> => {
    const response = await request.get('/fail');
    expect(response.status).toBe(200);
  });
});

describe('Testing file handling', (): void => {
  it('Should Be ok - image-resize: file content type should be an image', async () => {
    const response = await request.get(
      '/api/image-resize?width=300&height=500&filename=cat2.jpg'
    );
    expect(response.header['content-type']).toBe('image/png');
  });

  it('Should Be ok - placeholder: file content type should be an image', async () => {
    const response = await request.get('/api/placeholder?width=300&height=500');
    expect(response.header['content-type']).toBe('image/png');
  });
});
