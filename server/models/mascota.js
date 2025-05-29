const db = require('../config/database');
const oracledb = require('oracledb');

class Mascota {
  static async create(nombre, especie, raza, edad, id_dueno) {
    const sql = `
      INSERT INTO "MASCOTA" (NOMBRE, ESPECIE, RAZA, EDAD, ID_DUEÑO) 
      VALUES (:nombre, :especie, :raza, :edad, :id_dueno)
      RETURNING ID_MASCOTA INTO :id
    `;
    
    const binds = {
      nombre,
      especie,
      raza,
      edad,
      id_dueno,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const result = await db.simpleExecute(sql, binds, { autoCommit: true });
    return result.outBinds.id[0];
  }

  static async getAll() {
    const sql = `
      SELECT m.ID_MASCOTA, m.NOMBRE, m.ESPECIE, m.RAZA, m.EDAD, d.NOMBRE AS DUEÑO 
      FROM "MASCOTA" m
      JOIN "DUEÑO" d ON m.ID_DUEÑO = d.ID_DUEÑO
    `;
    const result = await db.simpleExecute(sql);
    
    return result.rows.map(row => ({
      id: row[0],
      nombre: row[1],
      especie: row[2],
      raza: row[3],
      edad: row[4],
      dueno: row[5]
    }));
  }
}

module.exports = Mascota;