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

export {sql};