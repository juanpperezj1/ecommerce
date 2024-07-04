import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUser } from '../usecases/CreateUser';

const userRepository = new UserRepository();

export class UserController {
  async index(req: Request, res: Response) {
    const users = await userRepository.findAll();
    res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await userRepository.findById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  }

  async store(req: Request, res: Response) {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const user = await userRepository.update(Number(req.params.id), req.body);
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    await userRepository.delete(Number(req.params.id));
    res.status(204).send();
  }
}
