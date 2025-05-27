const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

const app = express();

// Middleware CRÍTICO (orden importante)
app.use(cors()); // Permite peticiones desde el frontend
app.use(bodyParser.json()); // Parsea application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parsea form-data

// Sirve archivos estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Importar rutas 
const duenosRoutes = require('./routes/duenos');
const mascotasRoutes = require('./routes/mascotas'); 
const veterinariosRoutes = require('./routes/veterinarios');
const consultasRoutes = require('./routes/consultas');
const citasRoutes = require('./routes/citas');
app.use('/api/duenos', duenosRoutes);
app.use('/api/mascotas', mascotasRoutes); 
app.use('/api/veterinarios', veterinariosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/consultas', consultasRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: err.message });
});

// Inicializar
db.initialize()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor listo en http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Error inicializando DB:', err));