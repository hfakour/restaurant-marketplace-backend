import { NotificationId, NotificationUserId } from 'src/domain/types/entity-types';
import { NotificationEntity } from '../entity/notification.entity';

/**
 * Repository contract for Notification entity (domain layer).
 */
export interface INotificationRepository {
  /**
   * Find a notification by its unique ID.
   */
  findById(id: NotificationId): Promise<NotificationEntity | null>;

  /**
   * Find all notifications for a specific user.
   */
  findByUser(userId: NotificationUserId): Promise<NotificationEntity[]>;

  /**
   * Mark a notification as read and return the updated entity.
   */
  markAsRead(id: NotificationId): Promise<NotificationEntity>;

  /**
   * Create a new notification and return the created entity.
   */
  create(notification: NotificationEntity): Promise<NotificationEntity>;

  /**
   * Delete a notification by its ID.
   */
  delete(id: NotificationId): Promise<void>;
}
