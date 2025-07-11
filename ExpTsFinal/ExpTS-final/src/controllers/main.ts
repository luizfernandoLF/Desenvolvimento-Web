import { Request, Response } from 'express';
import { generateLorem } from '../utils/lorem'; 
import * as majorService from '../services/major.service'; 
import * as userService from '../services/user.service'; 
import { createUserSchema } from '../types/user.validation';

export const lorem = (req: Request, res: Response) => {
  const numParagrafos = parseInt(req.params.numParagrafos);
  if (isNaN(numParagrafos) || numParagrafos <= 0) {
    return res.status(400).send("Forneça um número válido de parágrafos");
  }

  const generatedText = generateLorem(numParagrafos);
  res.send(`${generatedText}`);
};

// action pra rota /
export const index = (req: Request, res: Response) => {
  res.send("Bem vindo ao meu site :)");
};

// action pra rota /teste
export const teste = (req: Request, res: Response) => {
  res.send("Página de teste");
};

// action pra rota /sobre
export const sobre = (req: Request, res: Response) => {
  res.send("Bem vindo à página sobre :)");
};

// action pra rota /api ou /rest
export const apiOrRest = (req: Request, res: Response) => {
  res.send("Envio de dados da API");
};

// action pra rota /bemvindo/:nome
export const bemvindo = (req: Request, res: Response) => {
  res.send(`Seja bem vindo ${req.params.nome}`);
};

// action pra rota /uai
export const uai = (req: Request, res: Response) => {
  res.send(`https://youtu.be/dQw4w9WgXcQ?si=dIrqft3AXZ1lPNMe`);
};

// action pra rota /hb1
export const hb1 = (req: Request, res: Response) => {
  res.render('hb1', {
    mensagem: 'HandleBar1',
    // layout: false
  });
};

// action pra rota /hb2 (do Exercício 5)
export const hb2 = (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    // layout: false
  });
};

// action pra rota /hb3 (do Exercício 5)
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

// action pra rota /hb4 (do Exercício 6)
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

export const signup = async (req: Request, res: Response) => {
    let majors = [];
    try {
        majors = await majorService.getAllMajors(); // Buscar a lista de cursos para o dropdown
    } catch (error) {
        console.error('Erro ao buscar a lista de cursos para o formulário de cadastro:', error);
    }

    if (req.method === 'GET') {
        res.render('signup', { majors }); // Renderiza a view de cadastro
    } else { // Requisição POST
        try {
            // Cuidado: Adicionar validação extra para 'repetir senha' aqui
            const { password, confirmPassword, ...userData } = req.body;

            // 1. Validação de Joi para os campos do usuário
            const { error, value } = createUserSchema.validate({ ...userData, password }); // Valida sem confirmPassword

            if (error) {
                console.error('Erro de validação ao cadastrar usuário:', error.details);
                return res.render('signup', {
                    error: error.details[0].message,
                    oldData: req.body, // Passa dados antigos para preencher o formulário
                    majors // Passa majors novamente
                });
            }

            // 2. Validação para "repetir senha"
            if (password !== confirmPassword) {
                return res.render('signup', {
                    error: 'As senhas não coincidem.',
                    oldData: req.body,
                    majors
                });
            }

            // 3. Verifica se o email já está em uso (opcional, mas boa prática)
            const existingUser = await userService.getUserByEmail(value.email); // Nova função no userService
            if (existingUser) {
                return res.render('signup', {
                    error: 'Este email já está cadastrado.',
                    oldData: req.body,
                    majors
                });
            }

            // Se tudo OK, cria o usuário
            await userService.createUser(value); // createUser já criptografa a senha
            res.redirect('/user'); // Redireciona para a lista de usuários ou uma página de sucesso

        } catch (error) {
            console.error('Erro ao processar cadastro de usuário:', error);
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    }
};


export default {
  index,
  teste,
  sobre,
  apiOrRest,
  bemvindo,
  uai,
  lorem, 
  hb1,
  hb2,
  hb3,
  hb4,
  about,
  signup
};