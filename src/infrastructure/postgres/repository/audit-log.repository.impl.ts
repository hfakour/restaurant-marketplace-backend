// src/infrastructure/database/repositories/audit-log.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AuditLogEntity } from 'src/domain/entity/audit-log.entity';
import { IAuditLogRepository } from 'src/domain/repository/audit-log.repository.interface';
import { AdminEmail } from 'src/domain/types/entity-types';

@Injectable()
export class AuditLogRepository implements IAuditLogRepository {
  constructor(
    @InjectRepository(AuditLogEntity, 'default')
    private readonly repo: EntityRepository<AuditLogEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Get all logs by Admin ID (typed using Admin['id'])
  async findByAdminId(adminId: AdminEmail): Promise<AuditLogEntity[]> {
    return this.repo.find({ admin: { id: adminId } });
  }

  // ➕ Add a new audit log
  async create(log: AuditLogEntity): Promise<void> {
    this.em.persist(log);
    await this.em.flush();
  }
}
