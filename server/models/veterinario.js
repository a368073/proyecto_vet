const db = require('../config/database');
const oracledb = require('oracledb');

// Definición de la clase Veterinario
class Veterinario {
  // Esto es para obteener todos los veterinarios
  static async getAll() {
    const result = await db.simpleExecute('SELECT * FROM Veterinario');
    return result.rows;
  }

  // Esto es para crear un nuevo veterinario
  static async create(nombre, especialidad) {
    const sql = `
      INSERT INTO Veterinario (nombre, especialidad)
      VALUES (:nombre, :especialidad)
      RETURNING id_veterinario INTO :id
    `;

    // arametros de entrada y salida
    const binds = { 
      nombre, 
      especialidad, 
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } 
    };
    const result = await db.simpleExecute(sql, binds, { autoCommit: true });
    return result.outBinds.id[0];
  }
}

module.exports = Veterinario;
