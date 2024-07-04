import { Product } from '../entities/Product';
import prisma from '../database/prisma';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    return await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
