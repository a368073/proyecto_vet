const db = require('../config/database');
const oracledb = require('oracledb');

class Tratamiento {
  static async create(id_consulta, medicamento, dosis, duracion) {
    const sql = `
      INSERT INTO "TRATAMIENTO" (ID_CONSULTA, MEDICAMENTO, DOSIS, DURACION) 
      VALUES (:id_consulta, :medicamento, :dosis, :duracion)
      RETURNING ID_TRATAMIENTO INTO :id
    `;
    
    const binds = {
      id_consulta,
      medicamento,
      dosis,
      duracion,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const result = await db.simpleExecute(sql, binds, { autoCommit: true });
    return result.outBinds.id[0];
  }

  static async getAll() {
    const sql = `
      SELECT t.ID_TRATAMIENTO, c.ID_CONSULTA, m.NOMBRE AS MASCOTA, 
             t.MEDICAMENTO, t.DOSIS, t.DURACION,
             TO_CHAR(c.FECHA, 'DD/MM/YYYY') AS FECHA_CONSULTA
      FROM "TRATAMIENTO" t
      JOIN "CONSULTA" c ON t.ID_CONSULTA = c.ID_CONSULTA
      JOIN "MASCOTA" m ON c.ID_MASCOTA = m.ID_MASCOTA
      ORDER BY c.FECHA DESC
    `;
    const result = await db.simpleExecute(sql);
    
    return result.rows.map(row => ({
      id: row[0],
      id_consulta: row[1],
      mascota: row[2],
      medicamento: row[3],
      dosis: row[4],
      duracion: row[5],
      fecha_consulta: row[6]
    }));
  }
}

module.exports = Tratamiento;