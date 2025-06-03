// // src/infrastructure/mongodb/support-message.repository.impl.ts

// import { Injectable } from '@nestjs/common';
// import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
// import { EntityRepository, EntityManager } from '@mikro-orm/mongodb';

// import { ISupportMessageRepository } from 'src/domain/repository/support-message.repository.interface';
// import { SupportMessageEntity } from 'src/domain/entity/support-message.entity';
// import { SupportMessageId } from 'src/domain/types/entity-types';

// @Injectable()
// export class SupportMessageRepository implements ISupportMessageRepository {
//   constructor(
//     @InjectRepository(SupportMessageEntity, 'mongo') // 🔁 MongoDB-specific repository
//     private readonly repo: EntityRepository<SupportMessageEntity>,

//     @InjectEntityManager('mongo') // 🧠 MongoDB entity manager
//     private readonly em: EntityManager,
//   ) {}

//   // 🔍 Find a message by its ID
//   async findById(id: SupportMessageId): Promise<SupportMessageEntity | null> {
//     return await this.repo.findOne({ id });
//   }

//   // 🔍 Find all messages sent by a specific user
//   async findByUser(userId: SupportMessageUserId): Promise<SupportMessageEntity[]> {
//     return await this.repo.find({ senderUser: userId });
//   }

//   // ➕ Create new message
//   async create(msg: SupportMessageEntity): Promise<void> {
//     await this.em.persistAndFlush(msg);
//   }

//   // 🔄 Update an existing message
//   async update(msg: SupportMessageEntity): Promise<void> {
//     await this.em.persistAndFlush(msg);
//   }

//   // ❌ Delete a message by its ID
//   async delete(id: SupportMessageId): Promise<void> {
//     const msg = await this.findById(id);
//     if (msg) {
//       await this.em.removeAndFlush(msg);
//     }
//   }
// }
