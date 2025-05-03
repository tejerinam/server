import express, {Application} from 'express';
import cors from 'cors';
import usuariosRoutes from '../routes/usuarios.routes';
import serviciosRoutes from '../routes/servicios.routes';

class Server {

    private app: Application;
    private port: string;

    private apiPaths = {
        usuarios: '/api/usuarios',
        servicios: '/api/servicios',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';

        this.middlewares();
        this.routes();
        //this.connectToDatabase();
    }

    listen() {
        this.app.listen(this.port, () => { 
            console.log('Servidor corriendo en el puerto', this.port);
            console.log('http://localhost:' + this.port);
        });
        
    }
        
    //TODO: BASE DE DATOS.
    /* connectToDatabase()
    {
        connectToDatabase();
    } */
    
    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse JSON
        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));
        // Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, usuariosRoutes);
        this.app.use(this.apiPaths.servicios, serviciosRoutes);
    }
}

export default Server;