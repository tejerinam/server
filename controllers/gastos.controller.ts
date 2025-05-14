import { Request, Response } from 'express';
import { connectToDatabase, sql } from '../database/connection';
import querys from '../database/querys';

export const getProductosGastos = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetTiposProductosGenerales);

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

export const GetZonas = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetZonas);

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

export const GetProvincias = async (req: Request, res: Response) => {
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetProvincias);

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

export const GetDireccionGastosGenerales = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetDireccionGastosGenerales);

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

export const GetRazonIdByIdDireccion = async (req: Request, res: Response):Promise<any> => {

    const {id} = req.query;

    console.log(id);

    const pool = await connectToDatabase();

    const result = await pool.request().input('id', sql.Int, id).query(querys.GetIdRazonByIdDireccion);

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

export const getMarcas = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetMarcas);

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

export const deleteGastoGeneral = async (req: Request, res: Response): Promise<any> => {

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
        
        const result = await pool.request().input('id_pago', sql.Int, id).query(querys.DeleteGastoGeneral);
        
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

export const GetGastosGenerales = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetGastosGenerales);

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



export const postLocalidad = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.localidad) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una localidad.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('localidad', sql.VarChar, body.localidad)
                                .input('id_provincia', sql.Int, body.provincia)
                                .input('id_zona', sql.Int, body.zona)
                                .query(querys.InsertLocalidad);
        
        console.log(result);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "La localidad no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Localidad Creada.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Localidad.",
            error,
        });
    }
}

export const postMarca = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.Marca) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Marca de producto.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('marca', sql.VarChar, body.Marca)
                                .query(querys.InsertMarca);
        
        console.log(result);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "La marca de producto no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Marca de Producto Creado.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Marca de Producto.",
            error,
        });
    }
}

export const postTipoProducto = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.tipo_producto) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un importe, y local de Gasto.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('tipo_producto', sql.VarChar, body.tipo_producto)
                                .input('descripcion', sql.VarChar, body.descripcion)
                                .query(querys.InsertTipoProducto);
        
        console.log(result);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El tipo de producto no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Tipo de Producto Creado.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Tipo de Producto.",
            error,
        });
    }
}

export const postGastosGenerales = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
        console.log(body);
    
        if (!body.importe && !body.id_direccion) {
            return res.json({
                status: 400,
                ok: false,
                msg: "Debe ingresar un importe, y local de Gasto.",
            });
        }
    
        try {
            const pool = await connectToDatabase();

            let result = await pool.request().input('id', sql.Numeric, body.id_direccion).query(querys.GetIdRazonByIdDireccion);
                
            if (result.recordset.length == 0) {
                return res.json({
                    status: 400,
                    ok: false,
                    msg: "El tipo servicio público no existe."
                });
            }
    
            let id_razonsocial = result.recordset[0].id_razonsocial;
            
            result = await pool.request().input('importe', sql.Decimal, body.importe)
                                        .input('fecha_registro', sql.DateTime, body.fecha_registro)
                                        .input('periodo', sql.DateTime!, body.periodo ? body.periodo : null)
                                        .input('id_usuario', sql.Int, body.id_usuario)
                                        .input('id_gasto', sql.Int!, body.id_gasto ? body.id_gasto : null)
                                        .input('id_direccion', sql.Int!, body.id_direccion ? body.id_direccion : null)
                                        .input('id_tipo', sql.Int, body.id_tipo)
                                        .input('realizada', sql.Bit, body.realizada ? body.realizada : 0)
                                        .input('detalle', sql.VarChar!, body.detalle ? body.detalle : null)
                                        .input('id_razonsocial', sql.Int!, id_razonsocial ? id_razonsocial : null)
                                        .input('id_marca', sql.Int!, body.id_marca ? body.id_marca : null)
                                        .query(querys.InsertGastosGenerales);
            
            return res.json({
                status: 200,
                ok: true,
                msg: "Gasto General fue Creado con éxito.",
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
