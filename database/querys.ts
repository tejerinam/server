export default {
    //Querys de Usuarios
    GetAllUsers: "SELECT * FROM Usuarios",
    GetUserById: "SELECT * FROM Usuarios WHERE id_usuario = ",
    InsertUser: "INSERT INTO Usuarios (usuario, password, fecha_alta) VALUES (@usuario, @password, @fecha_alta)",
    UpdateUser: "UPDATE Usuarios SET usuario = @usuario, password = @password WHERE id_usuario = @id",
    DeleteUser: "DELETE FROM Usuarios WHERE id_usuario = ",
    ExisteUsuario: "SELECT * FROM Usuarios WHERE usuario = ",

    //Querys de Servicios
    GetTiposRazonesSociales: "SELECT id_tipo_razon,tipo FROM Razon_Social_Tipos WHERE id_tipo_razon > 0",
    GetTipoRazonSocialServiciosPublicos: "SELECT id_tipo_razon, tipo FROM Razon_Social_Tipos",
    GetRazonesSocialesServiciosPublicos: "SELECT id_razonsocial, razon_social, id_tipo_razon FROM Razones_Sociales WHERE id_tipo_razon = (SELECT id_tipo_razon FROM Razon_Social_Tipos WHERE tipo = 'servicios publicos')",
    GetTipoProductoServiciosPublicos: "SELECT id_tipo,tipo_producto,descripcion FROM Tipos_Productos WHERE tipo_producto = 'servicios públicos'",
    InsertRazonSocialServicioPublico: "INSERT INTO Razones_Sociales (razon_social,id_tipo_razon,web) VALUES (@razon_social, @id_tipo_razon, @web)",
    InsertLocalRazonSocialServicioPublico: "INSERT INTO Locales (id_razonsocial,direccion,numero,id_localidad,telefono,whatsapp,comentario) VALUES (@id_razonsocial, @direccion, @numero, @id_localidad, @telefono, @whatsapp, @comentario)",
    InsertDescripcionGastoServicioPublico: "INSERT INTO Descripcion_Gastos (descripcion,periodico) VALUES (@descripcion, @periodico)",
    InsertGastosServicioPublico: "INSERT INTO Gastos (importe,fecha_registro,periodo,id_usuario,id_gasto,id_direccion,id_tipo,realizada,detalle,id_razonsocial,id_marca) VALUES (@importe, @fecha_registro, @periodo, @id_usuario, @id_gasto, @id_direccion, @id_tipo, @realizada, @detalle, @id_razonsocial, @id_marca)",
    InsertLocalServicioPublico: "INSERT INTO Locales (id_razonsocial,direccion,numero,id_localidad,telefono,whatsapp,comentario) VALUES (@id_razonsocial, @direccion, @numero, @id_localidad, @telefono, @whatsapp, @comentario)",
    UpdateGastosServicioPublico: "UPDATE Gastos SET importe = @importe, periodo = @periodo, id_usuario = @id_usuario, id_gasto = @id_gasto, id_direccion = @id_direccion, realizada = @realizada, detalle = @detalle, id_razonsocial = @id_razonsocial WHERE id_pago = @id_pago AND id_tipo = @id_tipo",
    UpdateLocalServicioPublico: "UPDATE Locales SET id_razonsocial = @id_razonsocial, direccion = @direccion, numero = @numero, id_localidad = @id_localidad, telefono = @telefono, whatsapp = @whatsapp, comentario = @comentario WHERE id_direccion = @id_direccion",
    ExisteIdDireccion: "SELECT * FROM Locales WHERE id_direccion = @id_direccion",
    DeleteLocalServicioPublico: "DELETE FROM Locales WHERE id_direccion = @id_direccion",
    DeleteGastoServicioPublico: "DELETE FROM Gastos WHERE id_pago = @id_pago",
    GastosServiciosList:"SELECT DISTINCT id_razonsocial, razon_social, rst.id_tipo_razon FROM Razones_Sociales as rs INNER JOIN Razon_Social_Tipos as rst ON rs.id_tipo_razon = rst.id_tipo_razon WHERE rst.tipo = 'servicios publicos'",
    GetDireccionedRazonSocialById:"SELECT DISTINCT id_direccion, direccion, numero, localidad, rs.id_razonsocial, razon_social FROM Razones_Sociales as rs INNER JOIN Locales as l ON rs.id_razonsocial = l.id_razonsocial INNER JOIN Localidad as loc ON l.id_localidad = loc.id_localidad WHERE rs.id_razonsocial > 0;",
    GetDescripcionesGastos:"SELECT id_gasto,descripcion,periodico FROM Descripcion_Gastos WHERE id_gasto > 0",
    GetGastosEnServicios: "SELECT g.id_pago, g.periodo, g.importe, dg.id_gasto, dg.descripcion, l.id_direccion, l.direccion, l.numero, loc.localidad, rs.id_razonsocial, rs.razon_social FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON g.id_gasto = dg.id_gasto LEFT JOIN Locales AS l ON l.id_direccion = g.id_direccion LEFT JOIN Localidad AS loc ON loc.id_localidad = l.id_localidad LEFT JOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Razones_Sociales AS rs ON rs.id_razonsocial = g.id_razonsocial LEFT JOIN Razon_Social_Tipos AS rst ON rst.id_tipo_razon = rs.id_tipo_razon WHERE rst.id_tipo_razon = (SELECT id_tipo_razon FROM Razon_Social_Tipos WHERE id_tipo_razon > 0 AND tipo = 'servicios publicos')",
    GetLocalidades: "SELECT id_localidad, localidad, provincia, isnull(zona,'') 'zona' FROM Localidad AS l LEFT JOIN Provincias AS p ON l.id_provincia = p.id_provincia LEFT JOIN Zonas AS z ON l.id_zona = z.id_zona WHERE id_localidad > 0;",
    GetServiciosAPagar: "SELECT id_pago, importe, periodo, dg.descripcion 'gasto', tp.descripcion, detalle, rs.razon_social, tp.tipo_producto FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON dg.id_gasto = g.id_gasto LEFT JOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Razones_Sociales AS rs ON rs.id_razonsocial = g.id_razonsocial WHERE g.realizada = 0 AND g.id_tipo = (SELECT id_tipo FROM Tipos_Productos WHERE tipo_producto = 'servicios públicos')",
    UpdateServicioPagado: "UPDATE Gastos SET importe = @importe, realizada = @realizada WHERE id_pago = @id_pago",
    GetServiciosAPagarFechas: "SELECT id_pago, importe, periodo, dg.descripcion 'gasto', tp.descripcion, detalle, rs.razon_social, tp.tipo_producto FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON dg.id_gasto = g.id_gasto LEFT JOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Razones_Sociales AS rs ON rs.id_razonsocial = g.id_razonsocial WHERE g.realizada = @realizada AND periodo between @desde AND @hasta AND g.id_tipo = (SELECT id_tipo FROM Tipos_Productos WHERE tipo_producto = 'servicios públicos')",
    GetServiciosAPagarFechasVencida: "SELECT id_pago, importe, periodo, dg.descripcion 'gasto', tp.descripcion, detalle, rs.razon_social, tp.tipo_producto FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON dg.id_gasto = g.id_gasto LEFT JOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Razones_Sociales AS rs ON rs.id_razonsocial = g.id_razonsocial WHERE g.realizada = 0 AND (periodo < GETDATE()) AND g.id_tipo = (SELECT id_tipo FROM Tipos_Productos WHERE tipo_producto = 'servicios públicos')",
    GetServiciosAPagarFechasPorVencer: "SELECT id_pago, importe, periodo, dg.descripcion 'gasto', tp.descripcion, detalle, rs.razon_social, tp.tipo_producto FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON dg.id_gasto = g.id_gasto LEFT JOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Razones_Sociales AS rs ON rs.id_razonsocial = g.id_razonsocial WHERE g.realizada = 0 AND periodo between GETDATE() AND DATEADD(day,15,GETDATE()) AND g.id_tipo = (SELECT id_tipo FROM Tipos_Productos WHERE tipo_producto = 'servicios públicos')",
    GetTiposProductosGenerales: "SELECT id_tipo,tipo_producto,descripcion FROM Tipos_Productos WHERE id_tipo > 0 AND tipo_producto <> 'servicios públicos'",
    GetMarcas: "SELECT id_marca, marca FROM Marcas_Productos WHERE id_marca > 0",
    GetDireccionGastosGenerales: "SELECT id_direccion, TRIM(direccion + ' ' + numero + ' ' + isnull(loc.localidad,'') + ' ' + ISNULL(p.provincia,'') + ' (' + razon_social + ')') as 'direccion' FROM Razones_Sociales AS rs INNER JOIN Locales AS l ON l.id_razonsocial = rs.id_razonsocial LEFT JOIN Localidad AS loc ON loc.id_localidad = l.id_localidad LEFT JOIN Provincias AS p ON p.id_provincia = loc.id_provincia WHERE l.id_direccion > 0 AND id_tipo_razon <> (SELECT id_tipo_razon from Razon_Social_Tipos WHERE tipo = 'servicios publicos')",
    InsertGastosGenerales: "INSERT INTO Gastos (importe,fecha_registro,periodo,id_gasto,id_direccion,id_tipo,realizada,detalle,id_razonsocial,id_marca,id_usuario) VALUES (@importe,@fecha_registro,@periodo,@id_gasto,@id_direccion,@id_tipo,@realizada,@detalle,@id_razonsocial,@id_marca,@id_usuario)",
    GetIdRazonByIdDireccion: "SELECT id_razonsocial FROM locales WHERE id_direccion = @id",
    InsertTipoProducto: "INSERT INTO Tipos_Productos (tipo_producto,descripcion) VALUES (@tipo_producto, @descripcion)",
    InsertMarca:"INSERT INTO Marcas_Productos (marca) VALUES (@marca)",
    GetProvincias:"SELECT id_provincia, provincia FROM Provincias WHERE id_provincia > 0",
    GetZonas: "SELECT id_zona, zona FROM Zonas WHERE id_zona > 0",
    InsertLocalidad: "INSERT INTO Localidad (localidad,id_provincia,id_zona) VALUES (@localidad, @id_provincia, @id_zona)",
    GetGastosGenerales: "SELECT g.importe,g.periodo,g.id_pago,dg.descripcion,mp.marca,tp.descripcion 'tipo',detalle FROM Gastos as g INNER JOIN Descripcion_Gastos as dg ON g.id_gasto = dg.id_gasto LEFT JOIN Marcas_Productos as mp ON mp.id_marca = g.id_marca LEFT JOIN Tipos_Productos as tp ON tp.id_tipo = g.id_tipo WHERE id_pago > 0 AND g.id_tipo <> (SELECT id_tipo FROM Tipos_Productos WHERE id_tipo > 0 AND  tipo_producto = 'servicios públicos') ORDER BY periodo ASC",
    DeleteGastoGeneral: "DELETE FROM Gastos WHERE id_pago = @id_pago",
    InsertZona: "INSERT INTO Zonas (zona) VALUES (@zona)",
    InsertAgendaGasto: "INSERT INTO Agenda_Gastos (descripcion,fecha_alta,alerta,fecha_limite,id_usuario) VALUES (@descripcion,@fecha_alta,@alerta,@fecha_limite,@id_usuario)",
    GetAgendaGastos: "SELECT id_agenda,descripcion,fecha_alta,alerta,fecha_limite,id_usuario FROM Agenda_Gastos WHERE id_agenda > 0;",
    DeleteItemsAgendaGasto: "DELETE FROM Agenda_Gastos_Detalle WHERE id_agenda = @id_agenda;",
    DeleteAgendaGasto: "DELETE FROM Agenda_Gastos WHERE id_agenda = @id_agenda;",
    InsertAgendaGastoItem: "INSERT INTO Agenda_Gastos_Detalle (id_agenda,id_tipo,id_marca,importe,realizada,fecha,periodo,cantidad,importeporunidad,detalle) VALUES (@id_agenda,@id_tipo,@id_marca,@importe,@realizada,@fecha,@periodo,@cantidad,@importeporunidad,@detalle)",
    GetAgendaGastosItems: "SELECT id_agenda,id_tipo,id_marca,importe,realizada,fecha,periodo,cantidad,importeporunidad, id_agendaitem, detalle FROM Agenda_Gastos_Detalle WHERE id_agenda = @id_agenda;",
    deleteAgendaItem: "DELETE FROM Agenda_Gastos_Detalle WHERE id_agendaitem = @id_agendaitem;",
    GetDireccionGastos: "SELECT id_direccion, TRIM(direccion + ' ' + numero + ' ' + isnull(loc.localidad,'') + ' ' + ISNULL(p.provincia,'') + ' (' + razon_social + ')') as 'direccion' FROM Razones_Sociales AS rs INNER JOIN Locales AS l ON l.id_razonsocial = rs.id_razonsocial LEFT JOIN Localidad AS loc ON loc.id_localidad = l.id_localidad LEFT JOIN Provincias AS p ON p.id_provincia = loc.id_provincia WHERE l.id_direccion > 0;",
    GetListadoDeCompras:"SELECT id_pago, importe, periodo, realizada, detalle, cantidad, importeporunidad, dg.descripcion, tp.descripcion 'tipoproducto', mp.marca FROM Gastos AS g LEFT JOIN Descripcion_Gastos AS dg ON dg.id_gasto = g.id_gasto LEFT jOIN Tipos_Productos AS tp ON tp.id_tipo = g.id_tipo LEFT JOIN Marcas_Productos AS mp ON mp.id_marca = g.id_marca ",
    InsertarPresupuesto: "INSERT INTO Presupuestos (mes,anio,Total,fecha_alta,id_usuario,descripcion) VALUES (@mes,@anio,@total,@fecha_alta,@id_usuario,@descripcion)",
    GetPresupuestos: "SELECT id_presupuesto,mes,anio,Total 'importe',fecha_alta,id_usuario,descripcion FROM Presupuestos WHERE id_presupuesto > 0;",
    deletePresupuesto: "DELETE FROM Presupuestos WHERE id_presupuesto = @id_presupuesto",
    GetTotalPresupuesto: "SELECT SUM(total) as total FROM (" +
                         "SELECT isnull(SUM(CASE ISNULL(importeporunidad,0) WHEN 1 THEN cantidad*importe ELSE importe END),0) total FROM Gastos WHERE realizada = 1 AND MONTH(periodo) = @mes AND YEAR(periodo) = @anio " +
                         "UNION ALL " +
                         "SELECT isnull(SUM(CASE ISNULL(importeporunidad,0) WHEN 0 THEN importe ELSE cantidad*importe END),0) total FROM Agenda_Gastos_Detalle WHERE realizada = 1 AND MONTH(periodo) = @mes AND YEAR(periodo) = @anio " +
                         ") as t;",
    UpdatePresupuesto: "UPDATE Presupuestos SET mes = @mes, anio = @anio, Total = @importe, descripcion = @descripcion WHERE id_presupuesto = @id_presupuesto",
    getGastosTipoProductos: "SELECT tipo_producto, descripcion, sum(total) 'total', sum(cantidad) 'cantidad' FROM (" +
                            "Select tipo_producto, descripcion, sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total', sum(isnull(cantidad,1)) 'cantidad' " + 
                            "from Agenda_Gastos_Detalle as agd INNER JOIN Tipos_Productos as tp ON tp.id_tipo = agd.id_tipo WHERE realizada = 1 GROUP BY tp.tipo_producto, tp.descripcion " +
                            "union all " +
                            "Select tipo_producto, descripcion, sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total', sum(isnull(cantidad,1)) 'cantidad' " + 
                            "from Gastos as agd INNER JOIN Tipos_Productos as tp ON tp.id_tipo = agd.id_tipo WHERE realizada = 1 GROUP BY tp.tipo_producto, tp.descripcion " +
                            ") as T WHERE tipo_producto NOT LIKE 'servicios públicos' GROUP BY T.tipo_producto, T.descripcion",
    getGastosPorPresupuesto: "SELECT descripcion, totalpres, periodo, sum(cantidad) 'cantidad', sum(total) 'total' FROM (" +
                             "SELECT p.descripcion, p.total 'totalpres', CONCAT(p.mes,'/',p.anio) 'periodo', sum(isnull(cantidad,1)) 'cantidad', sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total' " + 
                             "FROM Presupuestos AS p INNER JOIN Gastos AS g ON p.anio = YEAR(g.periodo) AND p.mes = MONTH(g.periodo) " + 
                             "WHERE realizada = @realizado GROUP BY p.anio, p.mes, p.Total, p.descripcion " +
                             "UNION ALL " +
                             "SELECT p.descripcion, p.total 'totalpres', CONCAT(p.mes,'/',p.anio) 'periodo', sum(isnull(cantidad,1)) 'cantidad', sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total' " + 
                             "FROM Presupuestos AS p INNER JOIN Agenda_Gastos_Detalle AS agd ON p.anio = YEAR(agd.periodo) AND p.mes = MONTH(agd.periodo) " +
                             "WHERE realizada = @realizado GROUP BY p.anio, p.mes, p.Total, p.descripcion) AS T GROUP BY descripcion, totalpres, periodo",
    getGastosPorMarcas: "SELECT marca, sum(isnull(cantidad,1)) 'cantidad', sum(total) 'total' FROM ( " +
                        "SELECT mp.marca, sum(isnull(cantidad,1)) 'cantidad', sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total' " +
                        "FROM Marcas_Productos mp INNER JOIN Agenda_Gastos_Detalle agd ON mp.id_marca = agd.id_marca WHERE realizada = @realizada GROUP BY mp.marca " +
                        "UNION ALL " +
                        "SELECT mp.marca, sum(isnull(cantidad,1)) 'cantidad', sum(case importeporunidad WHEN 1 THEN cantidad*importe ELSE importe END) 'total' " +
                        "FROM Marcas_Productos mp INNER JOIN Gastos g ON mp.id_marca = g.id_marca WHERE realizada = @realizada GROUP BY mp.marca) as T GROUP BY marca",
    getGastosPorLocales: "SELECT rs.razon_social, rst.tipo, sum(isnull(g.cantidad,1)) 'cantidad', SUM(case isnull(g.importeporunidad,1) WHEN 1 THEN isnull(g.cantidad,1)*g.importe ELSE g.importe END) 'total' " +
                         "FROM Gastos g INNER JOIN Razones_Sociales rs ON g.id_razonsocial = rs.id_razonsocial INNER JOIN Razon_Social_Tipos rst ON rst.id_tipo_razon = rs.id_tipo_razon " +
                         "WHERE realizada = @realizada GROUP BY razon_social, tipo",
}