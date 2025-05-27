const express = require('express');
const router = express.Router();
const veterinariosController = require('../controllers/veterinarios.controller');

router.get('/', veterinariosController.getAllVeterinarios);
router.post('/', veterinariosController.createVeterinario);

module.exports = router;