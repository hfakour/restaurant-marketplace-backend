// src/application/services/notification/notification.service.ts

import { Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { INotificationRepository } from 'src/domain/repository/notification.repository.interface';
import { NotificationId, NotificationUserId } from 'src/domain/types/entity-types';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepo: INotificationRepository) {}

  // 🔍 Fetch a single notification by its ID
  async getById(id: NotificationId): Promise<NotificationEntity | null> {
    return this.notificationRepo.findById(id);
  }

  // 📬 Fetch all notifications for a specific user
  async getByUser(userId: NotificationUserId): Promise<NotificationEntity[]> {
    return this.notificationRepo.findByUser(userId);
  }

  // ☑️ Mark a single notification as read
  async markAsRead(id: NotificationId): Promise<void> {
    await this.notificationRepo.markAsRead(id);
  }

  // ➕ Save a new notification
  async create(Notification: NotificationEntity): Promise<void> {
    await this.notificationRepo.save(Notification);
  }

  // ❌ Delete a notification
  async delete(id: NotificationId): Promise<void> {
    await this.notificationRepo.delete(id);
  }
}
