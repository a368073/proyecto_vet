const db = require('../config/database');
const oracledb = require('oracledb');

exports.createDueno = async (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.telefono || !req.body.correo) {
    return res.status(400).json({ 
      success: false,
      message: 'Datos incompletos'
    });
  }

  const { nombre, telefono, correo } = req.body;

  try {
    const sql = `
    INSERT INTO "DUEÑO" (NOMBRE, TELEFONO, CORREO) 
    VALUES (:nombre, :telefono, :correo)
    RETURNING ID_DUEÑO INTO :id
    `;
    
    const binds = {
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    correo: req.body.correo,
    id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

  
    const result = await db.simpleExecute(sql, binds, { autoCommit: true });

    
    res.status(201).json({
      success: true,
      id: result.outBinds.id[0],
      message: 'Dueño registrado correctamente'
    });

  } catch (err) {
    console.error('Error en createDueno:', err);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
};

exports.getAllDuenos = async (req, res) => {
  try {
    const sql = `SELECT ID_DUEÑO, NOMBRE, TELEFONO, CORREO FROM "DUEÑO"`;
    const result = await db.simpleExecute(sql);
    // Mapea por índice, no por nombre
    res.json(result.rows.map(row => ({
      id: row[0],
      nombre: row[1],
      telefono: row[2],
      correo: row[3]
    })));
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener dueños', error: err.message });
  }
};



