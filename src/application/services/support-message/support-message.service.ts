// src/application/services/support-message.service.ts

import { Injectable } from '@nestjs/common';
import { SupportMessageEntity } from 'src/domain/entities/support-message.entity';
import { ISupportMessageRepository } from 'src/domain/repository/support-message.repository.interface';

import { SupportMessageId, SupportMessageUserId } from 'src/domain/types/entity-types';

@Injectable()
export class SupportMessageService {
  constructor(private readonly supportMessageRepo: ISupportMessageRepository) {}

  async findById(id: SupportMessageId): Promise<SupportMessageEntity | null> {
    // 🔍 Get a single support message by its ID
    return this.supportMessageRepo.findById(id);
  }

  async findByUser(userId: SupportMessageUserId): Promise<SupportMessageEntity[]> {
    // 👤 Get all support messages for a specific user
    return this.supportMessageRepo.findByUser(userId);
  }

  async create(message: SupportMessageEntity): Promise<void> {
    // 🆕 Create a new support message
    await this.supportMessageRepo.create(message);
  }

  async update(message: SupportMessageEntity): Promise<void> {
    // 🔁 Update an existing support message
    await this.supportMessageRepo.update(message);
  }

  async delete(id: SupportMessageId): Promise<void> {
    // ❌ Delete a support message
    await this.supportMessageRepo.delete(id);
  }
}
