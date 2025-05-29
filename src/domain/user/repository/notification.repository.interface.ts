import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>;
  findByUser(userId: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  save(notification: Notification): Promise<void>;
  delete(id: string): Promise<void>;
}
