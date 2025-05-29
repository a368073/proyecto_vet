const Tratamiento = require('../models/tratamiento');
const db = require('../config/database');

exports.createTratamiento = async (req, res) => {
  if (!req.body || !req.body.id_consulta || !req.body.medicamento || !req.body.dosis || !req.body.duracion) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos: todos los campos son requeridos'
    });
  }

  try {
    const { id_consulta, medicamento, dosis, duracion } = req.body;
    
    const id = await Tratamiento.create(id_consulta, medicamento, dosis, duracion);
    
    res.status(201).json({
      success: true,
      id,
      message: 'Tratamiento registrado correctamente'
    });

  } catch (err) {
    console.error('Error en createTratamiento:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

exports.getAllTratamientos = async (req, res) => {
  try {
    const tratamientos = await Tratamiento.getAll();
    res.json({ success: true, data: tratamientos });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener tratamientos',
      error: err.message 
    });
  }
};

exports.getConsultasForSelect = async (req, res) => {
  try {
    const sql = `
      SELECT c.ID_CONSULTA, m.NOMBRE AS MASCOTA, 
             TO_CHAR(c.FECHA, 'DD/MM/YYYY') AS FECHA
      FROM "CONSULTA" c
      JOIN "MASCOTA" m ON c.ID_MASCOTA = m.ID_MASCOTA
      ORDER BY c.FECHA DESC
    `;
    const result = await db.simpleExecute(sql);
    
    res.json({
      success: true,
      data: result.rows.map(row => ({
        id: row[0],
        descripcion: `Consulta #${row[0]} - ${row[1]} (${row[2]})`
      }))
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener consultas',
      error: err.message 
    });
  }
};