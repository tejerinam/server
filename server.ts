import dotenv from 'dotenv';
import Server from './models/servidor';
dotenv.config();

export const server = new Server();
//server.middlewares();
server.listen();
