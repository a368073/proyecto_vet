const db = require('../config/database');
const oracledb = require('oracledb');

// Función para crear un nuevo veterinario
exports.createVeterinario = async (req, res) => {
  // Valida que los datos ingreados sean correctos
  if (!req.body || !req.body.nombre || !req.body.especialidad) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos'
    });
  }

  const { nombre, especialidad } = req.body;

  try {
    // Prepara la consulta SQL para insertar un nuevo veterinario
    const sql = `
      INSERT INTO Veterinario (nombre, especialidad)
      VALUES (:nombre, :especialidad)
      RETURNING id_veterinario INTO :id
    `;

    const binds = {
      nombre,
      especialidad,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    // Ejecuta la consulta para guardar el veterinario
    const result = await db.simpleExecute(sql, binds, { autoCommit: true });

    res.status(201).json({
      success: true,
      id: result.outBinds.id[0],
      message: 'Veterinario registrado correctamente'
    });

  } catch (err) {
    console.error('Error en createVeterinario:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

// Esta función sirve para obtener todos los veterinarios registrados en la base de datos
exports.getAllVeterinarios = async (req, res) => {
  try {
    const sql = `SELECT id_veterinario, nombre, especialidad FROM Veterinario`;
    const result = await db.simpleExecute(sql);

    // Mapea los resultados para devolverlos en un formato más amigable
    res.json(result.rows.map(row => ({
      id: row[0],
      nombre: row[1],
      especialidad: row[2]
    })));

  } catch (err) {
    console.error('Error en getAllVeterinarios:', err);
    res.status(500).json({
      success: false,
      message: 'Error al obtener veterinarios',
      error: err.message
    });
  }
};
