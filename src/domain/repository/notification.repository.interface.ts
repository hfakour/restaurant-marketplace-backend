import { NotificationId, NotificationUserId } from 'src/domain/types/entity-types';
import { NotificationEntity } from '../entities/notification.entity';

export interface INotificationRepository {
  findById(id: NotificationId): Promise<NotificationEntity | null>;
  findByUser(userId: NotificationUserId): Promise<NotificationEntity[]>;
  markAsRead(id: NotificationId): Promise<void>;
  save(notification: NotificationEntity): Promise<void>;
  delete(id: NotificationId): Promise<void>;
}
