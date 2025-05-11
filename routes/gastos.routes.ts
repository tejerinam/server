import { Router } from 'express';
import { getProductosGastos, getMarcas, GetDireccionGastosGenerales, postGastosGenerales,
    GetRazonIdByIdDireccion, postTipoProducto, postMarca, GetProvincias, GetZonas,
    postLocalidad } from '../controllers/gastos.controller';

const router = Router();

router.get('/', getProductosGastos);
router.get('/getMarcas', getMarcas);
router.get('/GetRazonIdByIdDireccion',GetRazonIdByIdDireccion)
router.get('/GetDireccionGastosGenerales', GetDireccionGastosGenerales);
router.get('/getProvincias',GetProvincias);
router.get('/getZonas', GetZonas);
router.post('/postGastosGenerales', postGastosGenerales);
router.post('/postTipoProducto', postTipoProducto)
router.post('/postMarca', postMarca);
router.post('/postLocalidad', postLocalidad);

export default router;