import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/ProductRepository';

const productRepository = new ProductRepository();

export class ProductController {
  async index(req: Request, res: Response) {
    const products = await productRepository.findAll();
    res.json(products);
  }

  async show(req: Request, res: Response) {
    const product = await productRepository.findById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  }

  async store(req: Request, res: Response) {
    const product = await productRepository.create(req.body);
    res.status(201).json(product);
  }

  async update(req: Request, res: Response) {
    const product = await productRepository.update(Number(req.params.id), req.body);
    res.json(product);
  }

  async delete(req: Request, res: Response) {
    await productRepository.delete(Number(req.params.id));
    res.status(204).send();
  }
}
