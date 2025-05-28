import { SupportMessageEntity } from '../entities/support-message.entity';

export abstract class ISupportMessageRepository {
  abstract findById(id: string): Promise<SupportMessageEntity | null>;
  abstract findByUser(userId: string): Promise<SupportMessageEntity[]>;
  abstract create(msg: SupportMessageEntity): Promise<SupportMessageEntity>;
  abstract update(msg: SupportMessageEntity): Promise<SupportMessageEntity>;
  abstract delete(id: string): Promise<void>;
}
