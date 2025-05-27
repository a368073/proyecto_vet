const db = require('../config/database');
const oracledb = require('oracledb');

class Consulta {
  static async create(id_mascota, diagnostico, observaciones) {
    const sql = `
      INSERT INTO "CONSULTA" (ID_MASCOTA, DIAGNOSTICO, OBSERVACIONES, FECHA) 
      VALUES (:id_mascota, :diagnostico, :observaciones, SYSDATE)
      RETURNING ID_CONSULTA INTO :id
    `;
    
    const binds = {
      id_mascota,
      diagnostico,
      observaciones,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const result = await db.simpleExecute(sql, binds, { autoCommit: true });
    return result.outBinds.id[0];
  }

  static async getAll() {
    const sql = `
      SELECT c.ID_CONSULTA, m.NOMBRE AS MASCOTA, 
             TO_CHAR(c.FECHA, 'DD/MM/YYYY') AS FECHA, 
             c.DIAGNOSTICO, c.OBSERVACIONES
      FROM "CONSULTA" c
      JOIN "MASCOTA" m ON c.ID_MASCOTA = m.ID_MASCOTA
      ORDER BY c.FECHA DESC
    `;
    const result = await db.simpleExecute(sql);
    
    return result.rows.map(row => ({
      id: row[0],
      mascota: row[1],
      fecha: row[2],
      diagnostico: row[3],
      observaciones: row[4] || 'N/A'
    }));
  }
}

module.exports = Consulta;