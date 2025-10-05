import express from 'express';
import CarroController from '../controllers/carroController.js';

const router = express.Router();

router.get('/', CarroController.listar);
router.get('/:id', CarroController.obter);
router.post('/', CarroController.criar);
router.put('/:id', CarroController.atualizar);
router.delete('/:id', CarroController.deletar);

export default router;
