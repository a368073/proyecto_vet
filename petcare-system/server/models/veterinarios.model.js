const { simpleExecute } = require('../config/database');

class Veterinario {
  static async getAll() {
    const result = await simpleExecute('SELECT * FROM VETERINARIOS');
    return result.rows;
  }

  static async create(nombre, especialidad) {
    const result = await simpleExecute(
      `INSERT INTO VETERINARIOS (NOMBRE, ESPECIALIDAD) 
       VALUES (:nombre, :especialidad) 
       RETURNING ID_VETERINARIO INTO :id`,
      { nombre, especialidad, id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } }
    );
    return result.outBinds.id[0];
  }
}

module.exports = Veterinario;