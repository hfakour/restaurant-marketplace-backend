// src/infrastructure/database/repositories/audit-log.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { IAuditLogRepository } from 'src/domain/repository/audit-log.repository.interface';
import { Admin } from 'src/domain/entities/admin.entity'; // 👈 Import Admin for typing

@Injectable()
export class AuditLogRepository implements IAuditLogRepository {
  constructor(
    @InjectRepository(AuditLog, 'default')
    private readonly repo: EntityRepository<AuditLog>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Get all logs by Admin ID (typed using Admin['id'])
  async findByAdminId(adminId: Admin['id']): Promise<AuditLog[]> {
    return this.repo.find({ admin: { id: adminId } });
  }

  // ➕ Add a new audit log
  async create(log: AuditLog): Promise<void> {
    this.em.persist(log);
    await this.em.flush();
  }
}
