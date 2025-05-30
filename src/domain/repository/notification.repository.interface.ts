import { NotificationId, NotificationUserId } from 'src/domain/types/entity-types';
import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  findById(id: NotificationId): Promise<Notification | null>;
  findByUser(userId: NotificationUserId): Promise<Notification[]>;
  markAsRead(id: NotificationId): Promise<void>;
  save(notification: Notification): Promise<void>;
  delete(id: NotificationId): Promise<void>;
}
