import { UserRole } from '../entities/user-role.enum';
import { User } from '../entities/user.entity';
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  findByRole(role: UserRole): Promise<User[]>;
  existsByEmail(email: string): Promise<boolean>;
}
