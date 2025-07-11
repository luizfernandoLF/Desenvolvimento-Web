import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major.types'; 

const prisma = new PrismaClient(); 

export const getAllMajors = async(): Promise<Major[]> => {
  return prisma.major.findMany(); //consulta todos os majors
};

export const createMajor = async (newMajor: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data: newMajor }); //cria um major no banco
};

export const getMajorById = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } }); //busca um Major pelo ID
};

export const updateMajor = async (id: string, updatedData: UpdateMajorDto): Promise<Major> => {
  return prisma.major.update({
    where: { id },
    data: updatedData,
  });
};

export const hasAssociatedUsers = async (majorId: string): Promise<boolean> => {
  const count = await prisma.user.count({
    where: { major_id: majorId },
  });
  return count > 0;
};

export const deleteMajor = async (id: string): Promise<Major> => {
  return prisma.major.delete({ where: { id } });
};
