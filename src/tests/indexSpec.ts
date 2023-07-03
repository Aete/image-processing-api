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

  it('Should Be failed - without any parameters: endpoint: /api/image-resize', async (): Promise<void> => {
    const response = await request.get('/api/image-resize');
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

// 파일이 존재하지 않을 때 -> 실패

// 파일이 존재하지만 이미지가 아닐 때 -> 실패

// 파일이 존재하고 이미지일 때 -> 성공
