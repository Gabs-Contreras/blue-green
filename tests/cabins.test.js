const request = require('supertest');
const app = require('../src/index');

describe('Cabin Endpoints', () => {
  it('GET /api/cabins - debería retornar lista de cabañas', async () => {
    const res = await request(app).get('/api/cabins');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });
});