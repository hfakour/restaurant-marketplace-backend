import {
  SupportMessageId,
  SupportMessageReceiverUserId,
  SupportMessageSenderUserId,
  UserId,
} from 'src/domain/types/entity-types';
import { SupportMessageEntity } from '../entity/support-message.entity';

/**
 * Repository contract for SupportMessage entity (domain layer).
 */
export interface ISupportMessageRepository {
  /**
   * Find a support message by its unique ID.
   */
  findById(id: SupportMessageId): Promise<SupportMessageEntity | null>;

  /**
   * Find all support messages sent by a specific user.
   */
  findBySenderUserId(senderId: SupportMessageSenderUserId): Promise<SupportMessageEntity[]>;

  /**
   * Find all support messages received by a specific user.
   */
  findByReceiverUserId(receiverId: SupportMessageReceiverUserId): Promise<SupportMessageEntity[]>;

  /**
   * Find all support messages where a user is either the sender or the receiver.
   * (For general inbox/outbox use cases)
   */
  findByUser(userId: UserId): Promise<SupportMessageEntity[]>;

  /**
   * Create a new support message and return the created entity.
   */
  create(msg: SupportMessageEntity): Promise<SupportMessageEntity>;

  /**
   * Update an existing support message and return the updated entity.
   */
  update(msg: SupportMessageEntity): Promise<SupportMessageEntity>;

  /**
   * Delete a support message by its ID.
   */
  delete(id: SupportMessageId): Promise<void>;
}
