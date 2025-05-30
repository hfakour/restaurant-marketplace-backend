import { SupportMessageId, SupportMessageUserId } from 'src/domain/types/entity-types';
import { SupportMessageEntity } from '../entities/support-message.entity';

export interface ISupportMessageRepository {
  findById(id: SupportMessageId): Promise<SupportMessageEntity | null>;
  findByUser(userId: SupportMessageUserId): Promise<SupportMessageEntity[]>;
  create(msg: SupportMessageEntity): Promise<void>;
  update(msg: SupportMessageEntity): Promise<void>;
  delete(id: SupportMessageId): Promise<void>;
}
