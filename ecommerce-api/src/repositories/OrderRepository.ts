import { Order } from '../entities/Order';
import prisma from '../database/prisma';

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt'> & {
  products: { productId: number; quantity: number }[];
};

export class OrderRepository {
  async findAll(): Promise<Order[]> {
    return await prisma.order.findMany({
      include: {
        products: true,
      },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async create(data: CreateOrderInput): Promise<Order> {
    const products = Array.isArray(data.products) ? data.products : [];
    return await prisma.order.create({
      data: {
        userId: Number(data.userId),
        products: {
          create: products.map(product => ({
            productId: Number(product.productId),
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  async update(id: number, data: Partial<Order> & { products?: { productId: number, quantity: number }[] }): Promise<Order> {
    const products = Array.isArray(data.products) ? data.products : [];
    return await prisma.order.update({
      where: { id },
      data: {
        userId: data.userId ? Number(data.userId) : undefined,
        products: {
          upsert: products.map(product => ({
            where: { orderId_productId: { orderId: id, productId: Number(product.productId) } },
            update: { quantity: product.quantity },
            create: { productId: Number(product.productId), quantity: product.quantity },
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.$transaction([
      prisma.orderProduct.deleteMany({
        where: { orderId: id },
      }),
      prisma.order.delete({
        where: { id },
      }),
    ]);
  }
}
