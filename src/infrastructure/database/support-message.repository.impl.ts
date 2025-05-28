import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { ISupportMessageRepository } from 'src/domain/user/repository/support-message.repository.interface';
import { SupportMessageEntity } from 'src/domain/user/entities/support-message.entity';

@Injectable()
export class SupportMessageRepository implements ISupportMessageRepository {
  constructor(
    @InjectRepository(SupportMessageEntity, 'default')
    private readonly repo: EntityRepository<SupportMessageEntity>,
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string) {
    return this.repo.findOne({ id });
  }
  async findByUser(userId: string) {
    return this.repo.find({ senderUser: userId });
  }
  async create(msg: SupportMessageEntity) {
    this.em.persist(msg);
    await this.em.flush();
    return msg;
  }
  async update(msg: SupportMessageEntity) {
    await this.em.flush();
    return msg;
  }
  async delete(id: string) {
    const msg = await this.findById(id);
    if (msg) {
      this.em.remove(msg);
      await this.em.flush();
    }
  }
}
