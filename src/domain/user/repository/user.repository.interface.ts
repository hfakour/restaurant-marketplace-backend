import { UserRole } from '../entities/user-role.enum';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>; // Find a user by ID
  findByEmail(email: string): Promise<User | null>; // Find user by email (used in login/register)
  findAll(): Promise<User[]>; // Get all users
  create(user: User): Promise<User>; // Persist new user
  update(user: User): Promise<User>; // Update user
  delete(id: string): Promise<void>; // Delete user by ID

  // Optional business-specific queries
  findByRole(role: UserRole): Promise<User[]>; // e.g., get all admins
  existsByEmail(email: string): Promise<boolean>; // Useful for validations
}
