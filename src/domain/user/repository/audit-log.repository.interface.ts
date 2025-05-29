import { AuditLog } from '../entities/audit-log.entity';

export abstract class IAuditLogRepository {
  abstract findByAdminId(adminId: string): Promise<AuditLog[]>;
  abstract create(log: AuditLog): Promise<void>;
}
