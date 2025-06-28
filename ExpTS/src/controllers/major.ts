import { Request, Response } from 'express';
import * as majorService from '../services/major.service';
import { CreateMajorDto, UpdateMajorDto } from '../types/major.types';
import { createMajorSchema, updateMajorSchema } from '../types/major.validation';

export const index = async (req: Request, res: Response) => {
  try {
    const majors = await majorService.getAllMajors();
    res.render('major-list', { majors });
  } catch (error) {
    console.error('Erro ao listar Majors:', error);
    res.status(500).send('Erro ao carregar a lista de cursos.');
  }
};

export const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('major-create'); 
  } else {
    try {
      const { error, value } = createMajorSchema.validate(req.body);
      if (error) {
        return res.render('major-create', { 
            error: error.details[0].message,
            oldData: req.body
        });
      }
      const newMajorData: CreateMajorDto = value;
      await majorService.createMajor(newMajorData);
      res.redirect('/major');
    } catch (error) {
      console.error('Erro ao criar Major:', error);
      res.status(500).send('Erro ao criar o curso.');
    }
  }
};

export const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await majorService.getMajorById(id);
    if (!major) {
      return res.status(404).send('Curso não encontrado.');
    }
    res.render('major-details', { major });
  } catch (error) {
    console.error('Erro ao buscar Major:', error);
    res.status(500).send('Erro ao buscar detalhes do curso.');
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === 'GET') {
    try {
      const major = await majorService.getMajorById(id);
      if (!major) {
        return res.status(404).send('Curso não encontrado para edição.');
      }
      res.render('major-update', { major });
    } catch (error) {
      console.error('Erro ao buscar Major para edição:', error);
      res.status(500).send('Erro ao carregar formulário de edição.');
    }
  } else { // Requisição POST
    try {
      const { error, value } = updateMajorSchema.validate(req.body);
      if (error) {
        const oldDataWithId = { ...req.body, id: id };
        return res.render('major-update', { 
            major: oldDataWithId,
            error: error.details[0].message
        });
      }
      const updatedMajorData: UpdateMajorDto = value;
      await majorService.updateMajor(id, updatedMajorData);
      res.redirect(`/major/read/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar Major:', error);
      res.status(500).send('Erro ao atualizar o curso.');
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const hasUsers = await majorService.hasAssociatedUsers(id);

    if (hasUsers) {
      console.error(`Não é possível deletar o Major ${id}: Existem usuários associados.`);
      return res.status(409).send('Não é possível apagar este curso. Existem usuários matriculados nele.');
    }

    await majorService.deleteMajor(id); // Chama a função do serviço para deletar
    res.redirect('/major');
  } catch (error) {
    console.error('Erro ao remover Major:', error);
    res.status(500).send('Erro ao remover o curso.');
  }
};

export default { index, create, read, update, remove };