import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Omit<User, 'id'>): Promise<User> {
    return await this.userRepository.create(data);
  }
}
