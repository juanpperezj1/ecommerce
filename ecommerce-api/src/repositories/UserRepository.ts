import { User } from '../entities/User';
import prisma from '../database/prisma';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
