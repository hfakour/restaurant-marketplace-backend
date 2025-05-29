import { Admin } from '../entities/admin.entity';

export abstract class IAdminRepository {
  abstract findById(id: string): Promise<Admin | null>;
  abstract findByEmail(email: string): Promise<Admin | null>;
  abstract create(admin: Admin): Promise<void>;
  abstract update(admin: Admin): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
