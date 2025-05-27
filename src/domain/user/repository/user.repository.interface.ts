import { User } from '../entities/user.entity'; // Strongly typed reference to domain entity

// ✅ Strongly typed repository interface
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
}

// ✅ Token for NestJS runtime injection
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
