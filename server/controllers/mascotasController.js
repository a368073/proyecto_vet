const Mascota = require('../models/mascota');
const db = require('../config/database');

exports.createMascota = async (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.especie || !req.body.id_dueno) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos: nombre, especie y dueño son requeridos'
    });
  }

  try {
    
    const { nombre, especie, raza, edad, id_dueno } = req.body;
    
    const id = await Mascota.create(nombre, especie, raza, edad, id_dueno);
    
    res.status(201).json({
      success: true,
      id,
      message: 'Mascota registrada correctamente'
    });

  } catch (err) {
    console.error('Error en createMascota:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

exports.getAllMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.getAll();
    res.json({ success: true, data: mascotas });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener mascotas',
      error: err.message 
    });
  }
};

exports.getDuenosForSelect = async (req, res) => {
  try {
    const sql = `SELECT ID_DUEÑO, NOMBRE FROM "DUEÑO"`;
    const result = await db.simpleExecute(sql);
    
    res.json({
      success: true,
      data: result.rows.map(row => ({
        id: row[0],
        nombre: row[1]
      }))
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener dueños',
      error: err.message 
    });
  }
};