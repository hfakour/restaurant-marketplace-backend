import { AdminEmail, AdminId } from 'src/domain/types/entity-types';
import { Admin } from '../entities/admin.entity';

export abstract class IAdminRepository {
  abstract findById(id: AdminId): Promise<Admin | null>;
  abstract findByEmail(email: AdminEmail): Promise<Admin | null>;
  abstract create(admin: Admin): Promise<void>;
  abstract update(admin: Admin): Promise<void>;
  abstract delete(id: AdminId): Promise<void>;
}
