import { Request, Response } from 'express';
import { connectToDatabase, sql, closeDatabaseConnection } from '../database/connection';
import querys from '../database/querys';

export const getProductosGastos = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetTiposProductosGenerales);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

    await closeDatabaseConnection(pool);

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

    await closeDatabaseConnection(pool);

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

export const GetListadoDeCompras = async (req: Request, res: Response) => {
    const { id_gasto, id_direccion, id_tipo, id_marca, comprado } = req.params;

    const pool = await connectToDatabase();

    let where : string = 'WHERE ';

    if (id_gasto.trim() !== '0') {
        where += `g.id_gasto = ${id_gasto} `;
    }

    if (id_direccion.trim() !== '0') {
        if (where.indexOf('=') !== -1) {
            where += `AND g.id_direccion = ${id_direccion} `;
        }
        else {
            where += `g.id_direccion = ${id_direccion} `;
        }
    }
    
    if (id_tipo.trim() !== '0') {
        if (where.indexOf('=') !== -1) {
            where += `AND g.id_tipo = ${id_tipo} `;
        }
        else {
            where += `g.id_tipo = ${id_tipo} `;
        }
    }

    if (id_marca.trim() !== '0') {
        if (where.indexOf('=') !== -1) {
            where += `AND g.id_marca = ${id_marca} `;
        }
        else {
            where += `g.id_marca = ${id_marca} `;
        }
    }

    if (comprado.trim() !== '3') {
        if (where.indexOf('=') !== -1) {
            where += `AND g.realizada = ${comprado} `;
        }
        else {
            where += `g.realizada = ${comprado} `;
        }
    }

    if (where === 'WHERE ') {
        where = '';
    }

    console.log('WHERE: ', where);

    const result = await pool.request().query(querys.GetListadoDeCompras + where);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

export const GetDireccionGastos = async (req: Request, res: Response) => {

    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetDireccionGastos);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

    await closeDatabaseConnection(pool);

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

    await closeDatabaseConnection(pool);

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

    await closeDatabaseConnection(pool);

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

export const getAgendaGastos = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetAgendaGastos);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

        await closeDatabaseConnection(pool);
        
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

export const deleteAgendaGasto = async (req: Request, res: Response): Promise<any> => {

    const { id }  = req.params;

    if (!id) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Item Agenda.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request().input('id_agenda', sql.Int, id).query(querys.DeleteItemsAgendaGasto);

        console.log(result);

        result = await pool.request().input('id_agenda', sql.Int, id).query(querys.DeleteAgendaGasto);

        console.log(result);

        await closeDatabaseConnection(pool);
        
        if (result.rowsAffected[0] === 1) {
            return res.json({
                status: 200,
                ok: true,
                msg: "El Gasto fue borrado con éxito.",
                result,
            });
        }
        else {
            return res.json({
                status: 400,
                ok: false,
                msg: "El Gasto no se borro.",
                result,
            });
        }
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

export const deletePresupuesto = async (req: Request, res: Response): Promise<any> => {
    const { id_presupuesto }  = req.params; 

    if (!id_presupuesto) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Presupuesto.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request()
                               .input('id_presupuesto', sql.Int, id_presupuesto)
                               .query(querys.deletePresupuesto);

        console.log(result);

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 1) {
            return res.json({
                status: 200,
                ok: true,
                msg: "El Presupuesto fue borrado con éxito.",
                result,
            });
        }
        else {
            return res.json({
                status: 400,
                ok: false,
                msg: "El Presupuesto no se borro.",
                result,
            });
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al borrar Presupuesto.",
            error,
        });
    }

}

export const deleteAgendaItem = async (req: Request, res: Response): Promise<any> => {

     const { id_agendaitem }  = req.params;

    if (id_agendaitem === "0") {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Item Agenda.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        let result = await pool.request()
                               .input('id_agendaitem', sql.Int, id_agendaitem)
                               .query(querys.deleteAgendaItem);

        console.log(result);

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 1) {
            return res.json({
                status: 200,
                ok: true,
                msg: "El Item fue borrado con éxito.",
                result,
            });
        }
        else {
            return res.json({
                status: 400,
                ok: false,
                msg: "El Item no se borro.",
                result,
            });
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al borrar Item.",
            error,
        });
    }
}

export const GetGastosGenerales = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetGastosGenerales);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

export const getPresupuestos = async (req: Request, res: Response) => {
    
    const pool = await connectToDatabase();

    const result = await pool.request().query(querys.GetPresupuestos);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

export const getAgendaGastosItems = async (req: Request, res: Response) => {
    
    const { id_agenda } = req.query;

    const pool = await connectToDatabase();

    const result = await pool.request().input("id_agenda", sql.Int, id_agenda).query(querys.GetAgendaGastosItems);

    console.log(result.recordset);

    await closeDatabaseConnection(pool);

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

export const postGrabarPresupuesto = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;

    console.log(body);
    if (!body.descripcion || body.descripcion === '' ||
        !body.anio || body.anio === 0 ||
        !body.mes || body.mes === 0 ||
        !body.importe || body.importe === 0) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Descripción, mes, año e importe.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('descripcion', sql.VarChar, body.descripcion)
                                .input('anio', sql.Int, body.anio)
                                .input('mes', sql.Int, body.mes)
                                .input('total', sql.Float, body.importe)
                                .input('id_usuario', sql.Int, body.id_usuario)
                                .input('fecha_alta', sql.DateTime, body.fecha_alta)
                                .query(querys.InsertarPresupuesto);
        
        console.log(result);

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El Presupuesto no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Presupuesto Creado.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Presupuesto.",
            error,
        });
    }
}

export const postAgendaGasto = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.descripcion) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Descripción.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('descripcion', sql.VarChar, body.descripcion)
                                .input('fecha_alta', sql.DateTime, body.fecha_alta)
                                .input('alerta', sql.Bit, body.alerta)
                                .input('fecha_limite', sql.DateTime, body.fecha_limite)
                                .input('id_usuario', sql.Int, body.id_usuario)
                                .query(querys.InsertAgendaGasto);
        
        console.log(result);

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "El item en la agenda no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Agenda Creada.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Agenda.",
            error,
        });
    }
}

export const postZona = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.zona) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar una Zona.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request()
                                .input('zona', sql.VarChar, body.zona)
                                .query(querys.InsertZona);
        
        console.log(result);

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 0) {
            return res.json({
                status: 400,
                ok: false,
                msg: "La zona no se ingreso."
            });
        }

        return res.json({
            status: 200,
            ok: true,
            msg: "Zona Creada.",
            result,
        });
    } catch (error) {
        return res.json({
            status: 500,
            ok: false,
            msg: "Error al crear Zona.",
            error,
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
        
        await closeDatabaseConnection(pool);
        
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

        await closeDatabaseConnection(pool);

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

        await closeDatabaseConnection(pool);

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
            
            result = await pool.request().input('importe', sql.Float, body.importe)
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

            await closeDatabaseConnection(pool);
            
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

export const postAgendaGastoItem = async (req:Request, res:Response): Promise<any> => {
    const { body } = req;
    
    console.log(body);

    if (!body.id_agenda || body.id_agenda === 0) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe ingresar un Id de Agenda.",
        });
    }

    try {
        const pool = await connectToDatabase();
        
        const result = await pool.request().input('id_agenda', sql.Int, body.id_agenda)
                                    .input('id_tipo', sql.Int, body.id_tipo)
                                    .input('id_marca', sql.Int, body.id_marca)
                                    .input('importe', sql.Float, body.importe)
                                    .input('realizada', sql.Bit, body.realizada)
                                    .input('fecha', sql.Date, new Date())
                                    .input('periodo', sql.Date, body.periodo)
                                    .input('cantidad', sql.Decimal, body.cantidad)
                                    .input('detalle', sql.VarChar, body.detalle)
                                    .input('importeporunidad', sql.Bit, body.importeporunidad)
                                    .query(querys.InsertAgendaGastoItem);
        
        await closeDatabaseConnection(pool);

        return res.json({
            status: 200,
            ok: true,
            msg: "Item de Agenda Gasto fue Creado con éxito.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);  
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al crear Item de Agenda Gasto.",
            error,
        });
    }
}

export const putPresupuesto = async (req: Request, res: Response): Promise<any> => {

    const { body } = req;
    const { id_presupuesto } = req.params;

    console.clear();

    console.log('------------------------------------------------');
    console.log('Presupuesto a Actualizar: ', id_presupuesto);
    console.log('------------------------------------------------');

    console.log('------------------------------------------------');
    console.log(body);
    console.log('------------------------------------------------');

    if (!body.id_presupuesto || body.id_presupuesto === undefined) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe seleccionar un presupuesto.",
        });
    }

    if (body.id_presupuesto !== id_presupuesto) {
        return res.json({
            status: 400,
            ok: false,
            msg: "Debe no coinciden los id de presupuesto.",
        });
    }

    try {
        const pool = await connectToDatabase();

        console.log('------------------------------------------------');
        console.log(querys.UpdatePresupuesto);
        console.log('------------------------------------------------');

       /*  "mes": presupuesto.mes,
        "anio": presupuesto.anio,
        "importe": presupuesto.importe,
        "descripcion": presupuesto.descripcion,
        "id_presupuesto": presupuesto.id_presupuesto
 */
        const result = await pool.request().input('id_presupuesto', sql.Int, body.id_presupuesto)
            .input('mes', sql.Int, body.mes)
            .input('descripcion', sql.NVarChar(255), body.descripcion)
            .input('anio', sql.Int, body.anio)
            .input('importe', sql.Float, Number(Number(body.importe).toFixed(2)))
            .query(querys.UpdatePresupuesto);

        //"UPDATE Presupuestos SET mes = @mes, anio = @anio, Total = @importe, descripcion = @descripcion WHERE id_presupuesto = @id_presupuesto"

        console.log('------------------------------------------------');
        console.log(result);
        console.log('------------------------------------------------');

        await closeDatabaseConnection(pool);

        if (result.rowsAffected[0] === 1) {
            return res.json({
                status: 200,
                ok: true,
                msg: "Presupuesto Actualizado con éxito.",
                result,
            });
        }

        return res.json({
            status: 400,
            ok: false,
            msg: "El Presupuesto no se Actualizo.",
            result,
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.json({
            status: 500,
            ok: true,
            msg: "Error al Actualizar Presupuesto.",
            error,
        });
    }
}

export const getTotalPresupuesto = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { mes, anio } = req.params;

    console.log(mes, anio);
    if (!mes || !anio) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe ingresar un mes y un año.',
        });
    }
    const pool = await connectToDatabase();

    const result = await pool.request()
        .input('mes', sql.Int, mes)
        .input('anio', sql.Int, anio)
        .query(querys.GetTotalPresupuesto);

    console.log(result);

    await closeDatabaseConnection(pool);

    if (result.rowsAffected[0] > 0) {
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

