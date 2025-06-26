import { Request, Response } from 'express';
// import { LoremIpsum } from 'lorem-ipsum';

// const loremGenerator = new LoremIpsum({
//   sentencesPerParagraph: { max: 8, min: 4 },
//   wordsPerSentence: { max: 16, min: 4 }
// });

//action pra rota / 
export const index = (req: Request, res: Response) => {
  res.send("Bem vindo ao meu site :)"); 
};

//action pra rota /teste
export const teste = (req: Request, res: Response) => {
  res.send("Página de teste");
};

//action pra rota /sobre
export const sobre = (req: Request, res: Response) => {
  res.send("Bem vindo à página sobre :)");
};

//action pra rota /api ou /rest
export const apiOrRest = (req: Request, res: Response) => {
  res.send("Envio de dados da API!");
};

//action pra rota /bemvindo/:nome
export const bemvindo = (req: Request, res: Response) => {
  res.send(`Seja bem vindo ${req.params.nome}`);
};

//action pra rota /uai
export const uai = (req: Request, res: Response) => {
  res.send(`https://youtu.be/dQw4w9WgXcQ?si=dIrqft3AXZ1lPNMe`);
};

//lorem que tava quebrando então comentei
// export const lorem = (req: Request, res: Response) => {
//   const numParagrafos = parseInt(req.params.numParagrafos);
//   if (isNaN(numParagrafos) || numParagrafos <= 0) {
//     return res.status(400).send("Forneça um número válido de parágrafos");
//   }
//   const generatedText = loremGenerator.generateParagraphs(numParagrafos);
//   res.send(`<pre>${generatedText}</pre>`);
// };

//action pra rota /hb1
export const hb1 = (req: Request, res: Response) => {
  res.render('hb1', { 
    mensagem: 'HandleBar1',
    // layout: false
  });
};

//action pra rota /hb2 (do Exercício 5)
export const hb2 = (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    // layout: false
  });
};

//action pra rota /hb3 (do Exercício 5)
export const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233},
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
  ];
  res.render('hb3', { 
    profes,
    // layout: false
  });
};

//action pra rota /hb4 (do Exercício 6)
export const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('hb4', { 
    technologies,
    // layout: false
  });
};

export const about = (req: Request, res: Response) => {
  res.render('about', {
    title: 'Sobre Space Shooter', 
    layout: 'main' 
  });
};


export default {
  index,
  teste,
  sobre,
  apiOrRest,
  bemvindo,
  uai,
//   lorem,
  hb1,
  hb2,
  hb3,
  hb4,
  about
};