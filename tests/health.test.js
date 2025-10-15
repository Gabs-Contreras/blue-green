const request = require('supertest');
const app = require('../src/index');

describe('Health Check Endpoints', () => {
  it('GET /api/health - debería retornar status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});