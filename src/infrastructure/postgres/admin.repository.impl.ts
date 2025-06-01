// src/infrastructure/database/repositories/admin.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { Admin } from 'src/domain/entities/admin.entity';
import { IAdminRepository } from 'src/domain/repository/admin.repository.interface';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(Admin, 'default')
    private readonly repo: EntityRepository<Admin>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find an Admin by their ID
  async findById(id: Admin['id']): Promise<Admin | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Find an Admin by their email address
  async findByEmail(email: Admin['email']): Promise<Admin | null> {
    return this.repo.findOne({ email });
  }

  // ➕ Add a new Admin to the database
  async create(admin: Admin): Promise<void> {
    this.em.persist(admin);
    await this.em.flush();
  }

  // ✏️ Update an existing Admin record
  async update(admin: Admin): Promise<void> {
    this.em.persist(admin);
    await this.em.flush();
  }

  // ❌ Delete an Admin by their ID
  async delete(id: Admin['id']): Promise<void> {
    const found = await this.findById(id);
    if (found) {
      this.em.remove(found);
      await this.em.flush();
    }
  }
}
