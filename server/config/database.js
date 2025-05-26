const oracledb = require('oracledb');

// Configuración de la conexión (ajusta con tus credenciales)
const dbConfig = {
  user: 'petcare',
  password: 'petcare123',
  connectString: 'localhost:1521/xe' // Cambia según tu configuración
};

let pool;

async function initialize() {
  pool = await oracledb.createPool(dbConfig);
  console.log('Conexión a Oracle establecida');
}

async function close() {
  if (pool) {
    await pool.close();
  }
}

async function simpleExecute(statement, binds = [], opts = {}) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.execute(statement, binds, opts);
    return result;
  } catch (err) {
    console.error('Error en simpleExecute:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Error al cerrar conexión:', err);
      }
    }
  }
}

module.exports = {
  initialize,
  close,
  simpleExecute
};