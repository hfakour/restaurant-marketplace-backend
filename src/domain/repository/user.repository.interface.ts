import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.enum';
import { UserEmail, UserId } from 'src/domain/types/entity-types';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByRole(role: UserRole): Promise<User[]>;
  existsByEmail(email: UserEmail): Promise<boolean>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;

  // 🔍 Add this method to support flexible filtering
  filterBy(filter: { email?: string; role?: UserRole }): Promise<User[]>;
}
