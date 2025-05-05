import { Router } from 'express';
import { getServiciosPublicos, getRazonSocialTipos, getTipoProductosServicios, 
    postRazonSocialServicioPublico, postLocalRazonSocialServicioPublico,
    postDescripcionGastoServicioPublico, postGastosServicioPublico,
    postLocalServicioPublico, putGastosServicioPublico,
    putLocalServicioPublico, deleteGastosServicioPublico,
    deleteLocalServicioPublico, getRazonSocialServicioPublico, getDireccionedRazonSocialById,
    getDescripcionesGastos, getTiposRazonesSociales, getGastosServiciosPublicos } from '../controllers/servicios.controller';


const router = Router();
//Gets
router.get('/', getServiciosPublicos);
router.get('/razonSocialTipo', getRazonSocialTipos);
router.get('/razonSocialTipoProducto', getTipoProductosServicios);
router.get('/razonSocialServicioPublico', getRazonSocialServicioPublico);
router.get('/direccionesRazonSocial', getDireccionedRazonSocialById);
router.get('/descripcionesGastos', getDescripcionesGastos);
router.get('/tiposRazonesSociales', getTiposRazonesSociales);
router.get('/gastosEnServicios', getGastosServiciosPublicos);

//Posts
router.post('/razonSocialServicioPublico', postRazonSocialServicioPublico);
router.post('/postLocalRazonSocialServicioPublico', postLocalRazonSocialServicioPublico);
router.post('/postDescripcionGastoServicioPublico', postDescripcionGastoServicioPublico);
router.post('/postGastosServicioPublico', postGastosServicioPublico);
router.post('/postLocalServicioPublico', postLocalServicioPublico);
//Puts
router.put('/:id', putGastosServicioPublico);
router.put('/putLocalServicioPublico/:id', putLocalServicioPublico);
//Deletes
router.delete('/:id', deleteGastosServicioPublico);
router.delete('/deleteLocalServicioPublico/:id', deleteLocalServicioPublico);

//router.get('/:name/:password', existeUsuario);

export default router;
