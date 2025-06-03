// src/infrastructure/database/repositories/admin.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AdminEntity } from 'src/domain/entity/admin.entity';
import { IAdminRepository } from 'src/domain/repository/admin.repository.interface';
import { AdminEmail, AdminId } from 'src/domain/types/entity-types';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(AdminEntity, 'default')
    private readonly repo: EntityRepository<AdminEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find an Admin by their ID
  async findById(id: AdminId): Promise<AdminEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Find an Admin by their email address
  async findByEmail(email: AdminEmail): Promise<AdminEntity | null> {
    return this.repo.findOne({ email });
  }

  // ➕ Add a new Admin to the database
  async create(admin: AdminEntity): Promise<void> {
    this.em.persist(admin);
    await this.em.flush();
  }

  // ✏️ Update an existing Admin record
  async update(admin: AdminEntity): Promise<void> {
    this.em.persist(admin);
    await this.em.flush();
  }

  // ❌ Delete an Admin by their ID
  async delete(id: AdminEmail): Promise<void> {
    const found = await this.findById(id);
    if (found) {
      this.em.remove(found);
      await this.em.flush();
    }
  }
}
