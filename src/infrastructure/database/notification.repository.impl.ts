// src/infrastructure/database/repositories/notification.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';

import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { INotificationRepository } from 'src/domain/repository/notification.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification, 'default')
    private readonly repo: EntityRepository<NotificationEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find a notification by its ID
  async findById(id: NotificationEntity['id']): Promise<NotificationEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Find all notifications sent to a specific user
  async findByUser(userId: User['id']): Promise<NotificationEntity[]> {
    return this.repo.find({ targetUser: { id: userId } });
  }

  // ✅ Mark a notification as read
  async markAsRead(id: NotificationEntity['id']): Promise<void> {
    const notification = await this.findById(id);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      this.em.persist(notification);
      await this.em.flush();
    }
  }

  // ➕ Save a new notification
  async save(notification: NotificationEntity): Promise<void> {
    this.em.persist(notification);
    await this.em.flush();
  }

  // ❌ Delete a notification by ID
  async delete(id: NotificationEntity['id']): Promise<void> {
    const existing = await this.findById(id);
    if (existing) {
      this.em.remove(existing);
      await this.em.flush();
    }
  }
}
