import { Router } from 'express';

import { getUsuarios, putUsuario, deleteUsuario, getUsuario, postUsuario, existeUsuario } from '../controllers/usuarios.contoller';


const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);
router.get('/:name/:password', existeUsuario);

export default router;



