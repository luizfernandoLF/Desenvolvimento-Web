import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../types/user.types';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();

export const getAllUsers = async(): Promise<User[]> => {
  return prisma.user.findMany({
    include: { major: true }, //inclui os dados do Major em todas as consultas
  });
};

export const createUser = async (newUser: CreateUserDto): Promise<User> => {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

  return prisma.user.create({
    data: {
      ...newUser,
      password: hashedPassword, //sobrescreve a senha com a versão criptografada
    },
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: { major: true },
  });
};

export const updateUser = async (id: string, updatedData: UpdateUserDto): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};