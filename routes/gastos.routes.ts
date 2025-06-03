import { Router } from 'express';
import { getProductosGastos, getMarcas, GetDireccionGastosGenerales, postGastosGenerales,
    GetRazonIdByIdDireccion, postTipoProducto, postMarca, GetProvincias, GetZonas,
    postLocalidad, GetGastosGenerales, deleteGastoGeneral, postZona, postAgendaGasto,
    getAgendaGastos, deleteAgendaGasto, postAgendaGastoItem, getAgendaGastosItems,
    deleteAgendaItem, GetDireccionGastos, GetListadoDeCompras, postGrabarPresupuesto,
    getPresupuestos, deletePresupuesto, putPresupuesto, getTotalPresupuesto } from '../controllers/gastos.controller';

const router = Router();

router.get('/', getProductosGastos);
router.get('/getMarcas', getMarcas);
router.get('/GetRazonIdByIdDireccion',GetRazonIdByIdDireccion)
router.get('/GetDireccionGastosGenerales', GetDireccionGastosGenerales);
router.get('/GetDireccionGastos', GetDireccionGastos);
router.get('/getProvincias',GetProvincias);
router.get('/getZonas', GetZonas);
router.get('/getGastosGenerales', GetGastosGenerales);
router.get('/getAgendaGastos', getAgendaGastos);
router.get('/getAgendaGastosItems', getAgendaGastosItems);
router.get('/GetListadoDeCompras/:id_gasto/:id_direccion/:id_tipo/:id_marca/:comprado', GetListadoDeCompras);
router.get('/getPresupuestos', getPresupuestos)
router.get('/getTotalPresupuesto/:mes/:anio', getTotalPresupuesto);
router.post('/postGastosGenerales', postGastosGenerales);
router.post('/postTipoProducto', postTipoProducto)
router.post('/postMarca', postMarca);
router.post('/postLocalidad', postLocalidad);
router.post('/postZona', postZona);
router.post('/postAgendaGasto', postAgendaGasto);
router.post('/postAgendaGastoItem', postAgendaGastoItem);
router.post('/postGrabarPresupuesto', postGrabarPresupuesto);
router.delete('/deleteGastoGeneral/:id', deleteGastoGeneral);
router.delete('/deleteAgendaGasto/:id', deleteAgendaGasto);
router.delete('/deleteAgendaItem/:id_agendaitem', deleteAgendaItem)
router.delete('/deletePresupuesto/:id_presupuesto', deletePresupuesto);
router.put('/putPresupuesto/:id_presupuesto', putPresupuesto);

export default router;