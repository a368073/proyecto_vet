const express = require('express');
const router = express.Router();
const veterinariosController = require('../controllers/veterinariosController');

// Crear nuevo veterinario
router.post('/', veterinariosController.createVeterinario);

// Obtener todos los veterinarios
router.get('/', veterinariosController.getAllVeterinarios);

module.exports = router;
