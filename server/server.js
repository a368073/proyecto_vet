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
app.use('/api/duenos', duenosRoutes);
app.use('/api/mascotas', mascotasRoutes); 

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