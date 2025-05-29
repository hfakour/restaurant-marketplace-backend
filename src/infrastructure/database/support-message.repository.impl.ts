// src/infrastructure/database/repositories/support-message.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { ISupportMessageRepository } from 'src/domain/user/repository/support-message.repository.interface';
import { SupportMessageEntity } from 'src/domain/user/entities/support-message.entity';
import { User } from 'src/domain/user/entities/user.entity';

@Injectable()
export class SupportMessageRepository implements ISupportMessageRepository {
  constructor(
    @InjectRepository(SupportMessageEntity, 'default')
    private readonly repo: EntityRepository<SupportMessageEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find message by ID
  async findById(id: SupportMessageEntity['id']): Promise<SupportMessageEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all messages from a specific user
  async findByUser(userId: User['id']): Promise<SupportMessageEntity[]> {
    return this.repo.find({ senderUser: { id: userId } });
  }

  // ➕ Create new message
  async create(msg: SupportMessageEntity): Promise<void> {
    this.em.persist(msg);
    await this.em.flush();
  }

  // 🔄 Update message
  async update(msg: SupportMessageEntity): Promise<void> {
    this.em.persist(msg);
    await this.em.flush();
  }

  // ❌ Delete message by ID
  async delete(id: SupportMessageEntity['id']): Promise<void> {
    const msg = await this.findById(id);
    if (msg) {
      this.em.remove(msg);
      await this.em.flush();
    }
  }
}
