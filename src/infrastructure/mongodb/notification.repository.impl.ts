// src/infrastructure/mongodb/notification.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';

import { INotificationRepository } from 'src/domain/repository/notification.repository.interface';
import { NotificationId, NotificationUserId } from 'src/domain/types/entity-types';
import { NotificationEntity } from 'src/domain/entities/notification.entity';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity, 'mongo') // 🧩 MongoDB repo
    private readonly repo: EntityRepository<NotificationEntity>,

    @InjectEntityManager('mongo') // 🧠 MongoDB EntityManager
    private readonly em: EntityManager,
  ) {}

  // 🔍 Get a notification by its unique ID
  async findById(id: NotificationId): Promise<NotificationEntity | null> {
    return await this.repo.findOne({ id });
  }

  // 📬 Get all notifications for a specific user
  async findByUser(userId: NotificationUserId): Promise<NotificationEntity[]> {
    return await this.repo.find({ targetUser: userId });
  }

  // 📥 Mark a notification as read
  async markAsRead(id: NotificationId): Promise<void> {
    const notification = await this.findById(id);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      await this.em.persistAndFlush(notification);
    }
  }

  // 💾 Save (create or update) a notification
  async save(notification: NotificationEntity): Promise<void> {
    await this.em.persistAndFlush(notification);
  }

  // ❌ Delete a notification by ID
  async delete(id: NotificationId): Promise<void> {
    const notification = await this.findById(id);
    if (notification) {
      await this.em.removeAndFlush(notification);
    }
  }
}
