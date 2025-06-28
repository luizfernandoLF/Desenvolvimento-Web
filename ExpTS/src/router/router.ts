
import { Router, RequestHandler } from 'express'; 
import mainController from '../controllers/main'; 
import majorController from '../controllers/major';
import userController from '../controllers/user';

const router = Router();

router.get('/', mainController.index);
router.get('/teste', mainController.teste);
router.get('/sobre', mainController.sobre);
router.get(/^\/(api|rest)\/.+$/, mainController.apiOrRest);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/uai', mainController.uai);
router.get('/lorem/:numParagrafos', mainController.lorem as unknown as RequestHandler);
router.get('/hb1', mainController.hb1); // Rota do Exercício 5
router.get('/hb2', mainController.hb2); // Rota do Exercício 5
router.get('/hb3', mainController.hb3); // Rota do Exercício 5
router.get('/hb4', mainController.hb4); // Rota do Exercício 6
router.get('/about', mainController.about);


// ROTAS PARA O CRUD DE MAJOR - COM CASTS 
router.get('/major', majorController.index as unknown as RequestHandler);             //lista todos os cursos
router.all('/major/create', majorController.create as unknown as RequestHandler);     //exibe formulário e processa criação
router.get('/major/read/:id', majorController.read as unknown as RequestHandler);     //exibe detalhes de um curso
router.all('/major/update/:id', majorController.update as unknown as RequestHandler); //exibe formulário e processa atualização
router.post('/major/remove/:id', majorController.remove as unknown as RequestHandler);

router.get('/user', userController.index as unknown as RequestHandler);
router.all('/user/create', userController.create as unknown as RequestHandler);
router.get('/user/read/:id', userController.read as unknown as RequestHandler);
router.all('/user/update/:id', userController.update as unknown as RequestHandler);
router.post('/user/remove/:id', userController.remove as unknown as RequestHandler);


export default router;