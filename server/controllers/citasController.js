const Cita = require('../models/cita');
const db = require('../config/database');

exports.createCita = async (req, res) => {
  if (!req.body || !req.body.id_mascota || !req.body.id_veterinario || !req.body.fecha || !req.body.motivo) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos: mascota, veterinario, fecha y motivo son requeridos'
    });
  }

  try {
    const { id_mascota, id_veterinario, fecha, hora, motivo } = req.body;
    
    const id = await Cita.create(id_mascota, id_veterinario, fecha, hora, motivo);
    
    res.status(201).json({
      success: true,
      id,
      message: 'Cita agendada correctamente'
    });

  } catch (err) {
    console.error('Error en createCita:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.getAll();
    res.json({ success: true, data: citas });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener citas',
      error: err.message 
    });
  }
};

exports.getSelectData = async (req, res) => {
  try {
    // Mascotas
    const mascotasResult = await db.simpleExecute('SELECT ID_MASCOTA, NOMBRE FROM "MASCOTA"');
    // Veterinarios
    const veterinariosResult = await db.simpleExecute('SELECT ID_VETERINARIO, NOMBRE FROM "VETERINARIO"');
    res.json({
      data: {
        mascotas: mascotasResult.rows.map(row => ({
          id: row[0],
          nombre: row[1]
        })),
        veterinarios: veterinariosResult.rows.map(row => ({
          id: row[0],
          nombre: row[1]
        }))
      }
    });
  } catch (err) {
    console.error('Error en getSelectData:', err);
    res.status(500).json({ message: 'Error cargando datos', error: err.message });
  }
};