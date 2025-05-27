const express = require('express');
const router = express.Router();
const veterinariosController = require('../controllers/veterinarios.controller');

// Rutas idénticas a las de dueños (pero para veterinarios)
router.get('/', veterinariosController.getAllVeterinarios);
router.post('/', veterinariosController.createVeterinario);

module.exports = router;