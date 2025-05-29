const db = require('../config/database');

class Dueno {
  static async getAll() {
    const result = await db.simpleExecute('SELECT * FROM DUEÑO');
    return result.rows;
  }

  static async create(nombre, telefono, correo) {
    const sql = `
      INSERT INTO DUEÑO (nombre, telefono, correo) 
      VALUES (:nombre, :telefono, :correo)
      RETURNING id_dueno INTO :id
    `;
    const binds = { nombre, telefono, correo, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } };
    const result = await db.simpleExecute(sql, binds);
    return result.outBinds.id[0];
  }

  // Más métodos según necesites (getById, update, delete, etc.)
}

module.exports = Dueno;