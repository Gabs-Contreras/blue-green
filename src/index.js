const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria para pruebas
let reservations = [];
let cabins = [
  { id: 1, name: 'Cabaña Río', price: 800, available: true },
  { id: 2, name: 'Cabaña Montaña', price: 1200, available: true }
];

// ------- RUTAS -------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// Obtener cabañas
app.get('/api/cabins', (req, res) => {
  res.json(cabins);
});

// Crear reserva
app.post('/api/reservations', (req, res) => {
  const { cabinId, userName, checkIn, checkOut } = req.body;
  
  if (!cabinId || !userName || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const cabin = cabins.find(c => c.id === cabinId);
  if (!cabin) {
    return res.status(404).json({ error: 'Cabaña no encontrada' });
  }

  const reservation = {
    id: reservations.length + 1,
    cabinId,
    userName,
    checkIn,
    checkOut,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  reservations.push(reservation);
  res.status(201).json(reservation);
});

// Obtener reservas
app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

// ------- MANEJO DE ERRORES -------
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ------- INICIAR SERVIDOR -------
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto', PORT);
    console.log('Health check: http://localhost:' + PORT + '/api/health');
  });
  
  module.exports = server;
} else {
  module.exports = app;
}