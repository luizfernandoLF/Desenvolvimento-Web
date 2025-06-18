import { Router, Request, Response } from 'express';
// import { LoremIpsum } from 'lorem-ipsum'; 
                                        

const router = Router();


// const loremGenerator = new LoremIpsum({
//   sentencesPerParagraph: { max: 8, min: 4 },
//   wordsPerSentence: { max: 16, min: 4 }
// });

router.get("/", (req: Request, res: Response) => { res.send("Bem vindo ao meu site :)"); });
router.get("/teste", (req: Request, res: Response) => { res.send("Página de teste"); });
router.get("/sobre", (req: Request, res: Response) => { res.send("Bem vindo à página sobre :)"); });
router.get(/^\/(api|rest)\/.+$/, (req: Request, res: Response) => { res.send("Envio de dados da API!"); });
router.get("/bemvindo/:nome", (req: Request, res: Response) => { res.send(`Seja bem vindo ${req.params.nome}`); });
router.get("/uai", (req: Request, res: Response) => { res.send(`https://youtu.be/dQw4w9WgXcQ?si=dIrqft3AXZ1lPNMe`); });

// Rota do Exercício 4: Lorem Ipsum (Mantenha ou remova conforme sua decisão)
// router.get("/lorem/:numParagrafos", (req: Request, res: Response) => {
//   const numParagrafos = parseInt(req.params.numParagrafos);
//   if (isNaN(numParagrafos) || numParagrafos <= 0) {
//     return res.status(400).send("forneça um número válido de parágrafos");
//   }
//   const generatedText = loremGenerator.generateParagraphs(numParagrafos);
//   res.send(`<pre>${generatedText}</pre>`);
// });

//rotas 5
router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!', // Remova o '' daqui
    layout: false
  });
});

router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2', { 
    poweredByNodejs: true,
    name: 'Express',    
    type: 'Framework',    
    layout: false 
  });
});

router.get('/hb3', (req: Request, res: Response) => {
  const profes = [ 
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233},
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
  ];
  res.render('hb3', {
    profes, 
    layout: false 
  });
});

export default router;