import { AdminEmail, AdminId } from 'src/domain/types/entity-types';
import { AdminEntity } from '../entity/admin.entity';

/**
 * Repository contract for Admin entity.
 * (Pure Domain Layer—no infrastructure details)
 */
export interface IAdminRepository {
  /**
   * Find admin by unique ID.
   */
  findById(id: AdminId): Promise<AdminEntity | null>;

  /**
   * Find admin by unique email.
   */
  findByEmail(email: AdminEmail): Promise<AdminEntity | null>;

  /**
   * Persist a new admin entity and return the saved entity.
   */
  create(admin: AdminEntity): Promise<AdminEntity>;

  /**
   * Update an existing admin entity and return the updated entity.
   */
  update(admin: AdminEntity): Promise<AdminEntity>;

  /**
   * Delete an admin by ID.
   */
  delete(id: AdminId): Promise<void>;
}
