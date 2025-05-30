import sql from 'mssql';
import { config } from './config';

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Conectado a la base');
    return pool;
  } catch (error) {
    console.error('Falló la conexión a la base:', error);
    throw error;
  }
};

export async function closeDatabaseConnection(pool: sql.ConnectionPool) {
  try {
    await pool.close();
    console.log('Conexión a la base cerrada');
  } catch (error) { 

    console.error('Error al cerrar la conexión a la base:', error);
    throw error;
  } 
}

export {sql};