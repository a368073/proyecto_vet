const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

// Importar rutas
const duenosRoutes = require('./routes/duenos');
const mascotasRoutes = require('./routes/mascotas');
const citasRoutes = require('./routes/citas');
const consultasRoutes = require('./routes/consultas');
const tratamientosRoutes = require('./routes/tratamientos');
const veterinariosRoutes = require('./routes/veterinarios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/duenos', duenosRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/api/tratamientos', tratamientosRoutes);
app.use('/api/veterinarios', veterinariosRoutes);

// Inicializar base de datos
db.initialize()
  .then(() => {
    console.log('Base de datos inicializada');
  })
  .catch(err => {
    console.error('Error inicializando base de datos:', err);
    process.exit(1);
  });

module.exports = app;