import { Request, Response } from 'express';
import { connectToDatabase, sql } from '../database/connection';
import { ConnectionPool, query } from 'mssql';
import querys from '../database/querys';


export const getUsuarios = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetAllUsers);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            usuarios: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const existeUsuario = async (req: Request, res: Response) : Promise<any> => {
    const { name, password } = req.params; 

    try
    {
        const pool = await connectToDatabase();
    
        //pool.request().input('id', sql.VarChar, id);
        const result = await pool.request().query(querys.ExisteUsuario + "'" + name + "'" + " AND password = '" + password + "'");
    
        return res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            usuarios: result.recordset,
        });
    }
    catch (error)
    {
        return res.status(500).json({
            ok: false,
            msg: 'Error al conectar a la base de datos',
            error: error,   
        });
    }
}

export const getUsuario = async (req: Request, res: Response): Promise<any> => {

    const id = req.params.id;

    try
    {
        const pool = await connectToDatabase();
    
        //pool.request().input('id', sql.VarChar, id);
        const result = await pool.request().query(querys.GetUserById + id);
    
        return res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            usuarios: result.recordset,
        });
    }
    catch (error)
    {
        return res.status(500).json({
            ok: false,
            msg: 'Error al conectar a la base de datos',
            error: error,   
        });
    }
}   

export const postUsuario = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    if (!body.password || !body.usuario) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Los datos Password y Usuario son obligatorios"
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().query(querys.ExisteUsuario + "'" + body.usuario + "'" + " AND password = '" + body.password + "'");
    
        if (result.recordset.length > 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El usuario ya existe."
            });
        }

        result = await pool.request()
            .input('usuario', sql.VarChar, body.usuario)
            .input('password', sql.VarChar, body.password)
            .input('fecha_alta', sql.DateTime, body.fecha_alta)
            .query(querys.InsertUser);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Usuario creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear el usuario.",
            error,
        });
    }
}  

export const putUsuario = async (req: Request, res: Response): Promise<any> => {

    const { id } = req.params;
    const { body } = req;

    if (!body.password || !body.usuario) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Los datos Password y Usuario son obligatorios"
        });
    }

    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('usuario', sql.VarChar, body.usuario)
            .input('password', sql.VarChar, body.password)
            .query(querys.UpdateUser);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Usuario actualizado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear el usuario.",
            error,
        });
    }
}  

export const deleteUsuario = async (req: Request, res: Response): Promise<any> => {

    const id = req.params.id;
    
    try
    {
        const pool = await connectToDatabase();
    
        const result = await pool.request().query(querys.DeleteUser + id);
        return res.status(200).json({ 
            ok: true,
            msg: 'Usuario borrado con éxito',
            usuarios: result.recordset,
        });
    }
    catch (error)
    {
        return res.status(500).json({
            ok: false,
            msg: 'Error al conectar a la base de datos',
            error: error,   
        });
    }
}   
