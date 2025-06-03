import { AuditLogId, AdminId } from 'src/domain/types/entity-types';
import { AuditLogEntity } from '../entity/audit-log.entity';

/**
 * Repository contract for audit logs (domain layer).
 */
export interface IAuditLogRepository {
  /**
   * Find all audit logs for a given admin.
   */
  findByAdminId(adminId: AdminId): Promise<AuditLogEntity[]>;

  /**
   * Find an audit log by its unique ID.
   */
  findById(id: AuditLogId): Promise<AuditLogEntity | null>;

  /**
   * Persist a new audit log and return the created entity.
   */
  create(log: AuditLogEntity): Promise<AuditLogEntity>;
}
