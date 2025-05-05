import { Request, Response } from 'express';
import { connectToDatabase, sql } from '../database/connection';
//import { ConnectionPool, query } from 'mssql';
import querys from '../database/querys';

export const getDireccionedRazonSocialById = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();

    const result = await pool.request()
        
        .query(querys.GetDireccionedRazonSocialById);

    console.log(result.recordset);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getDescripcionesGastos = async (req: Request, res: Response) => {
    //const id = req.params.id;

    const pool = await connectToDatabase();

    const result = await pool.request()
        //.input('id_razonsocial', sql.Int, id)
        .query(querys.GetDescripcionesGastos);

    console.log(result.recordset);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getGastosServiciosPublicosById = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();
    const { id } = req.params;
    
    
    const result = await pool.request().query(querys.GastosServiciosList);



    console.log(querys.GastosServiciosList);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getServiciosPublicos = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GastosServiciosList);

    console.log(querys.GastosServiciosList);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getTiposRazonesSociales = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetTiposRazonesSociales);

    console.log(result);
    
    if (result) {
        res.status(200).json({
            ok: true,
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getRazonSocialServicioPublico = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetRazonesSocialesServiciosPublicos);

    console.log(result);
    
    if (result) {
        res.status(200).json({
            ok: true,
            datos: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getRazonSocialTipos = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetTipoRazonSocialServiciosPublicos);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            dato: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getTipoProductosServicios = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetTipoProductoServiciosPublicos);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            dato: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const getGastosServiciosPublicos = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();
    const result = await pool.request().query(querys.GetGastosEnServicios);

    if (result) {
        res.status(200).json({ 
            ok: true,
            msg: 'Consulta realizada con éxito',
            dato: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el resultado de la base de datos.',
        });
    }
}

export const postRazonSocialServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    if (!body.razon_social) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Razón Social."
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().query(querys.GetTipoRazonSocialServiciosPublicos);
    
        if (result.recordset.length == 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El tipo servicio público no existe."
            });
        }

        let id_tipoRazonSocial = result.recordset[0].id_tipo_razon;
        
        let web = body.web || null;

        result = await pool.request()
            .input('razon_social', sql.VarChar, body.razon_social)
            .input('id_tipo_razon', sql.Int, id_tipoRazonSocial)
            .input('web', sql.VarChar, web)
            .query(querys.InsertRazonSocialServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Razón Social Creada con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al ingresar Razón Social.",
            error,
        });
    }
}

export const postLocalRazonSocialServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    if (!body.id_razonsocial) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Razon Social."
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('id_razonsocial', sql.Int, body.id_razonsocial)
                                           .input('direccion', sql.VarChar, body.direccion)
                                           .input('numero', sql.VarChar, body.numero)
                                           .input('id_localidad', sql.VarChar, body.id_localidad)
                                           .input('telefono', sql.VarChar, body.telefono)
                                           .input('whatsapp', sql.VarChar, body.whatsapp)
                                           .input('comentario', sql.VarChar, body.comentario)
                                           .query(querys.InsertLocalRazonSocialServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Local de Servicio Creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al crear el Local.",
            error,
        });
    }
}

export const postDescripcionGastoServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    if (!body.descripcion) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Descripción de Gasto de Servicio Público.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('descripcion', sql.VarChar, body.descripcion)
                                           .input('periodico', sql.Bit, body.periodico ? body.periodico : 0)
                                           .query(querys.InsertDescripcionGastoServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "La Descripción de Gastos fue Creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al crear Descripción de Gastos.",
            error,
        });
    }
}

export const postGastosServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    console.log(body);

    if (!body.importe) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un importe de Gasto de Servicio Público.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().query(querys.GetTipoProductoServiciosPublicos);
    
        if (result.recordset.length == 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El tipo servicio público no existe."
            });
        }

        let id_tipoRazonSocial = result.recordset[0].id_tipo;

        result = await pool.request().input('importe', sql.Decimal, body.importe)
                                    .input('fecha_registro', sql.DateTime, body.fecha_registro)
                                    .input('periodo', sql.DateTime!, body.periodo ? body.periodo : null)
                                    .input('id_usuario', sql.Int, body.id_usuario)
                                    .input('id_gasto', sql.Int!, body.id_gasto ? body.id_gasto : null)
                                    .input('id_direccion', sql.Int!, body.id_direccion ? body.id_direccion : null)
                                    .input('id_tipo', sql.Int, id_tipoRazonSocial)
                                    .input('realizada', sql.Bit, body.realizada ? body.realizada : 0)
                                    .input('detalle', sql.VarChar!, body.detalle ? body.detalle : null)
                                    .input('id_razonsocial', sql.Int!, body.id_razonsocial ? body.id_razonsocial : null)
                                    .input('id_marca', sql.Int!, body.id_marca ? body.id_marca : null)
                                    .query(querys.InsertGastosServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Gasto de Servicio fue Creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al crear Descripción de Gastos.",
            error,
        });
    }
}

export const postLocalServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;

    console.log(body);

    if (!body.id_razonsocial) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar alguna Razón Social.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('id_razonsocial', sql.Int, body.id_razonsocial)
                                           .input('direccion', sql.VarChar!, body.direccion ? body.direccion : null)
                                           .input('numero', sql.VarChar!, body.numero ? body.numero : null)
                                           .input('id_localidad', sql.Int!, body.id_localidad ? body.id_localidad : null)
                                           .input('telefono', sql.VarChar!, body.telefono ? body.telefono : null)
                                           .input('whatsapp', sql.VarChar!, body.whatsapp ? body.whatsapp : null)
                                           .input('comentario', sql.VarChar!, body.comentario ? body.comentario : null)
                                           .query(querys.InsertLocalServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Dirección fue Creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al ingresar Dirección.",
            error,
        });
    }
}

export const putGastosServicioPublico = async (req: Request, res: Response): Promise<any> => {
    const { body } = req;
    const { id } = req.params;

    if (!body.id_razonsocial) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Razón Social."
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().query(querys.GetTipoProductoServiciosPublicos);
    
        if (result.recordset.length == 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El tipo servicio público no existe."
            });
        }

        let id_tipoRazonSocial = result.recordset[0].id_tipo;
        
        result = await pool.request()
            .input('importe', sql.Decimal, body.importe)
            .input('periodo', sql.DateTime!, body.periodo ? body.periodo : null)
            .input('id_usuario', sql.Int, body.id_usuario)
            .input('id_gasto', sql.Int!, body.id_gasto ? body.id_gasto : null)
            .input('id_direccion', sql.Int!, body.id_direccion ? body.id_direccion : null)
            .input('realizada', sql.Bit, body.realizada ? body.realizada : 0)
            .input('detalle', sql.VarChar!, body.detalle ? body.detalle : null)
            .input('id_razonsocial', sql.Int, body.id_razonsocial)
            .input('id_pago', sql.Int, id)
            .input('id_tipo', sql.Int, id_tipoRazonSocial)
            .query(querys.UpdateGastosServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Gasto Actualizada con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al Actualizar Gasto.",
            error,
        });
    }
}

export const putLocalServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;
    const { id } = req.params;

    if (!body.id_razonsocial) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar alguna Razón Social.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().input('id_direccion', sql.Int, id).query(querys.ExisteIdDireccion);

        if (result.recordset.length == 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El Local no existe."
            });
        }

        result = await pool.request().input('id_razonsocial', sql.Int, body.id_razonsocial)
                                           .input('direccion', sql.VarChar!, body.direccion ? body.direccion : null)
                                           .input('numero', sql.VarChar!, body.numero ? body.numero : null)
                                           .input('id_localidad', sql.Int!, body.id_localidad ? body.id_localidad : null)
                                           .input('telefono', sql.VarChar!, body.telefono ? body.telefono : null)
                                           .input('whatsapp', sql.VarChar!, body.whatsapp ? body.whatsapp : null)
                                           .input('comentario', sql.VarChar!, body.comentario ? body.comentario : null)
                                           .input('id_direccion', sql.Int, id)
                                           .query(querys.UpdateLocalServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "Dirección fue Actualizada con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al Actualizar Dirección.",
            error,
        });
    }
}

export const deleteGastosServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { id }  = req.params;

    if (!id) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Gasto de Servicio Público.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('id_pago', sql.Int, id).query(querys.DeleteGastoServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "El Gasto fue borrado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al borrar Gastos.",
            error,
        });
    }
}

export const deleteLocalServicioPublico = async (req: Request, res: Response): Promise<any> => {

    const { id }  = req.params;

    if (!id) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Gasto de Servicio Público.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('id_direccion', sql.Int, id).query(querys.DeleteLocalServicioPublico);
        
        return res.json({
            status: 200,
            ok: true,
            msg: "El Gasto fue borrado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al borrar Gasto de Servicio.",
            error,
        });
    }
}