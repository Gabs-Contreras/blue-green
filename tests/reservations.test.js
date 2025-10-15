const request = require('supertest');
const app = require('../src/index');

describe('Reservation Endpoints', () => {
  beforeEach(() => {
    // Limpiar reservas antes de cada test
    const appInstance = require('../src/index');
    appInstance._reservations = []; // Resetear si fuera necesario
  });

  it('POST /api/reservations - debería crear una reserva válida', async () => {
    const reservationData = {
      cabinId: 1,
      userName: 'Juan Pérez',
      checkIn: '2024-12-01',
      checkOut: '2024-12-05'
    };

    const res = await request(app)
      .post('/api/reservations')
      .send(reservationData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.userName).toBe('Juan Pérez');
    expect(res.body.status).toBe('confirmed');
  });

  it('POST /api/reservations - debería fallar con datos incompletos', async () => {
    const invalidData = {
      cabinId: 1
    };

    const res = await request(app)
      .post('/api/reservations')
      .send(invalidData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/reservations - debería listar todas las reservas', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});