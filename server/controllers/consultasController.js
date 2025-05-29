const Consulta = require('../models/consulta');
const db = require('../config/database');

exports.createConsulta = async (req, res) => {
  if (!req.body || !req.body.id_mascota || !req.body.diagnostico) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos: mascota y diagnóstico son requeridos'
    });
  }

  try {
    const { id_mascota, diagnostico, observaciones } = req.body;
    
    const id = await Consulta.create(id_mascota, diagnostico, observaciones);
    
    res.status(201).json({
      success: true,
      id,
      message: 'Consulta registrada correctamente'
    });

  } catch (err) {
    console.error('Error en createConsulta:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

exports.getAllConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.getAll();
    res.json({ success: true, data: consultas });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener consultas',
      error: err.message 
    });
  }
};

exports.getMascotasForSelect = async (req, res) => {
  try {
    const sql = `SELECT ID_MASCOTA, NOMBRE FROM "MASCOTA"`;
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
      message: 'Error al obtener mascotas',
      error: err.message 
    });
  }
};