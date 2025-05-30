import { AdminId } from 'src/domain/types/entity-ids';
import { AuditLog } from '../entities/audit-log.entity';

export abstract class IAuditLogRepository {
  abstract findByAdminId(adminId: AdminId): Promise<AuditLog[]>;
  abstract create(log: AuditLog): Promise<void>;
}
