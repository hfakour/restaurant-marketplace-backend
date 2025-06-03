import { UserEntity } from '../entity/user.entity';
import { UserRole } from '../enums/user-role.enum';
import { UserEmail, UserId } from 'src/domain/types/entity-types';

/**
 * Filter input for user repository.
 */
export interface UserFilter {
  email?: UserEmail;
  role?: UserRole;
  // Extendable: Add other filters as needed (e.g., isActive, createdAt, etc.)
}

/**
 * Repository contract for User entity (domain layer).
 */
export interface IUserRepository {
  /**
   * Find a user by their unique ID.
   */
  findById(id: UserId): Promise<UserEntity | null>;

  /**
   * Find a user by their unique email address.
   */
  findByEmail(email: UserEmail): Promise<UserEntity | null>;

  /**
   * Retrieve all users.
   */
  findAll(): Promise<UserEntity[]>;

  /**
   * Find users by their role.
   */
  findByRole(role: UserRole): Promise<UserEntity[]>;

  /**
   * Check if a user exists by their email.
   */
  existsByEmail(email: UserEmail): Promise<boolean>;

  /**
   * Create a new user and return the created entity.
   */
  create(user: UserEntity): Promise<UserEntity>;

  /**
   * Update an existing user and return the updated entity.
   */
  update(user: UserEntity): Promise<UserEntity>;

  /**
   * Delete a user by their ID.
   */
  delete(id: UserId): Promise<void>;

  /**
   * Find users by flexible filter criteria.
   */
  filterBy(filter: UserFilter): Promise<UserEntity[]>;
}
