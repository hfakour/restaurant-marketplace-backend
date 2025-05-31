import { AdminId } from 'src/domain/types/entity-types';
import { AuditLog } from '../entities/audit-log.entity';

export interface IAuditLogRepository {
  findByAdminId(adminId: AdminId): Promise<AuditLog[]>;
  create(log: AuditLog): Promise<void>;
}
