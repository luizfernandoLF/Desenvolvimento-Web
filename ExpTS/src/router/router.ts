import { Router } from 'express';
import mainController from '../controllers/main'; 

const router = Router();

router.get('/', mainController.index);
router.get('/teste', mainController.teste);
router.get('/sobre', mainController.sobre);
router.get(/^\/(api|rest)\/.+$/, mainController.apiOrRest);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/uai', mainController.uai);
// router.get('/lorem/:numParagrafos', mainController.lorem); 
router.get('/hb1', mainController.hb1); // Rota do Exercício 5
router.get('/hb2', mainController.hb2); // Rota do Exercício 5
router.get('/hb3', mainController.hb3); // Rota do Exercício 5
router.get('/hb4', mainController.hb4); // Rota do Exercício 6

export default router;