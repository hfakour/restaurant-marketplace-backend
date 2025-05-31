// src/application/services/audit-log.service.ts

import { Injectable } from '@nestjs/common';
import { IAuditLogRepository } from 'src/domain/repository/audit-log.repository.interface';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { Admin } from 'src/domain/entities/admin.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class AuditLogService {
  constructor(
    private readonly auditLogRepo: IAuditLogRepository,
    private readonly em: EntityManager, // Used for referencing admin without loading
  ) {}

  /**
   * Logs an audit event (e.g., entity update/delete)
   */
  async createLog(
    adminId: Admin['id'], // Admin performing the action
    action: string, // Action performed e.g. "Updated Category"
    target: string, // Target entity or ID
    details: Record<string, unknown>, // Context (old/new values, etc.)
  ): Promise<void> {
    const adminRef = this.em.getReference(Admin, adminId);

    const log = new AuditLog();
    log.admin = adminRef;
    log.action = action;
    log.target = target;
    log.details = details;

    await this.auditLogRepo.create(log);
  }

  /**
   * Returns all logs performed by a specific admin
   */
  async getLogsByAdmin(adminId: Admin['id']): Promise<AuditLog[]> {
    return this.auditLogRepo.findByAdminId(adminId);
  }
}
