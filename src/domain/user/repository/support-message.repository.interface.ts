import { SupportMessageEntity } from '../entities/support-message.entity';
export interface ISupportMessageRepository {
  findById(id: string): Promise<SupportMessageEntity | null>;
  findByUser(userId: string): Promise<SupportMessageEntity[]>;
  create(msg: SupportMessageEntity): Promise<void>;
  update(msg: SupportMessageEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
