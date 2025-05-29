const db = require('../config/database');
const oracledb = require('oracledb');

class Cita {
  static async create(id_mascota, id_veterinario, fecha, hora, motivo) {
    const sql = `
      INSERT INTO "CITA" (ID_MASCOTA, ID_VETERINARIO, FECHA, HORA, MOTIVO) 
      VALUES (:id_mascota, :id_veterinario, TO_DATE(:fecha, 'YYYY-MM-DD'), :hora, :motivo)
      RETURNING ID_CITA INTO :id
    `;
    
    const binds = {
      id_mascota,
      id_veterinario,
      fecha,
      hora,
      motivo,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const result = await db.simpleExecute(sql, binds, { autoCommit: true });
    return result.outBinds.id[0];
  }

  static async getAll() {
    const sql = `
      SELECT c.ID_CITA, m.NOMBRE AS MASCOTA, v.NOMBRE AS VETERINARIO, 
             TO_CHAR(c.FECHA, 'DD/MM/YYYY') AS FECHA, c.HORA, c.MOTIVO
      FROM "CITA" c
      JOIN "MASCOTA" m ON c.ID_MASCOTA = m.ID_MASCOTA
      JOIN "VETERINARIO" v ON c.ID_VETERINARIO = v.ID_VETERINARIO
      ORDER BY c.FECHA DESC, c.HORA DESC
    `;
    const result = await db.simpleExecute(sql);
    
    return result.rows.map(row => ({
      id: row[0],
      mascota: row[1],
      veterinario: row[2],
      fecha: row[3],
      hora: row[4],
      motivo: row[5]
    }));
  }
}

module.exports = Cita;