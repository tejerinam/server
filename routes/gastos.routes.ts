import { Router } from 'express';
import { getProductosGastos, getMarcas, GetDireccionGastosGenerales, postGastosGenerales,
    GetRazonIdByIdDireccion } from '../controllers/gastos.controller';

const router = Router();

router.get('/', getProductosGastos);
router.get('/getMarcas', getMarcas);
router.get('/GetRazonIdByIdDireccion',GetRazonIdByIdDireccion)
router.get('/GetDireccionGastosGenerales', GetDireccionGastosGenerales);
router.post('/postGastosGenerales', postGastosGenerales);

export default router;