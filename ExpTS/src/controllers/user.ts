import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import * as majorService from '../services/major.service'; 
import { CreateUserDto, UpdateUserDto } from '../types/user.types';
import { createUserSchema, updateUserSchema } from '../types/user.validation';

export const index = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.render('list', { users }); 
  } catch (error) {
    console.error('Erro ao listar Usuários:', error);
    res.status(500).send('Erro ao carregar a lista de usuários.');
  }
};

export const create = async (req: Request, res: Response) => {
  let majors = [];
  try {
    majors = await majorService.getAllMajors();
  } catch (error) {
    console.error('Erro ao buscar a lista de cursos para o formulário de usuário:', error);
  }

  if (req.method === 'GET') {
    res.render('create', { majors }); 
  } else { // Requisição POST
    try {
      const { error, value } = createUserSchema.validate(req.body);

      if (error) {
        console.error('Erro de validação ao criar Usuário:', error.details);
        return res.render('create', { 
            error: error.details[0].message,
            oldData: req.body,
            majors
        });
      }

      const newUserData: CreateUserDto = value;
      await userService.createUser(newUserData);
      res.redirect('/user');
    } catch (error) {
      console.error('Erro ao criar Usuário:', error);
      res.status(500).send('Erro ao criar o usuário.');
    }
  }
};

export const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
    res.render('details', { user }); 
  } catch (error) {
    console.error('Erro ao buscar Usuário:', error);
    res.status(500).send('Erro ao buscar detalhes do usuário.');
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === 'GET') {
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).send('Usuário não encontrado para edição.');
      }
      const majors = await majorService.getAllMajors(); 
      res.render('update', { user, majors });
    } catch (error) {
      console.error('Erro ao buscar Usuário para edição:', error);
      res.status(500).send('Erro ao carregar formulário de edição de usuário.');
    }
  } else { // Requisição POST
    try {
      const { error, value } = updateUserSchema.validate(req.body);

      if (error) {
        console.error('Erro de validação ao atualizar Usuário:', error.details);
        const majors = await majorService.getAllMajors(); 
        const oldDataWithId = { ...req.body, id: id };
        return res.render('update', { 
            user: oldDataWithId,
            error: error.details[0].message,
            majors
        });
      }

      const updatedUserData: UpdateUserDto = value;
      await userService.updateUser(id, updatedUserData);
      res.redirect(`/user/read/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar Usuário:', error);
      res.status(500).send('Erro ao atualizar o usuário.');
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.redirect('/user');
  } catch (error) {
    console.error('Erro ao remover Usuário:', error);
    res.status(500).send('Erro ao remover o usuário.');
  }
};



export default { index, create, read, update, remove };