const oracledb = require('oracledb'); 
const Veterinario = require('../models/veterinarios.model');

exports.getAllVeterinarios = async (req, res) => {
  try {
    const veterinarios = await Veterinario.getAll();
    res.json(veterinarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVeterinario = async (req, res) => {
  try {
    const { nombre, especialidad } = req.body;
    const id = await Veterinario.create(nombre, especialidad);
    res.status(201).json({ id, nombre, especialidad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};