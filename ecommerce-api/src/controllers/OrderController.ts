import { Request, Response } from 'express';
import { OrderRepository, CreateOrderInput } from '../repositories/OrderRepository';

const orderRepository = new OrderRepository();

export class OrderController {
  async getOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await orderRepository.findAll();
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const order = await orderRepository.findById(Number(id));
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, products } = req.body;
      const orderData: CreateOrderInput = { userId, products };
      const order = await orderRepository.create(orderData);
      return res.status(201).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { userId, products } = req.body;
      const order = await orderRepository.update(Number(id), { userId, products });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await orderRepository.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
