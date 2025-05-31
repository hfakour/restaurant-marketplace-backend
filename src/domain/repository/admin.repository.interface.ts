import { AdminEmail, AdminId } from 'src/domain/types/entity-types';
import { Admin } from '../entities/admin.entity';

export interface IAdminRepository {
  findById(id: AdminId): Promise<Admin | null>;
  findByEmail(email: AdminEmail): Promise<Admin | null>;
  create(admin: Admin): Promise<void>;
  update(admin: Admin): Promise<void>;
  delete(id: AdminId): Promise<void>;
}
