import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ReservationEntity } from 'src/domain/user/entities/reservation.entity';
import { IReservationRepository } from 'src/domain/user/repository/reservation.repository.interface';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity, 'default')
    private readonly repo: EntityRepository<ReservationEntity>,
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string) {
    return this.repo.findOne({ id });
  }
  async findByUser(userId: string) {
    return this.repo.find({ user: userId });
  }
  async findByRestaurant(restaurantId: string) {
    return this.repo.find({ restaurant: restaurantId });
  }
  async create(entity: ReservationEntity) {
    this.em.persist(entity);
    await this.em.flush();
    return entity;
  }
  async update(entity: ReservationEntity) {
    await this.em.flush();
    return entity;
  }
  async delete(id: string) {
    const found = await this.findById(id);
    if (found) {
      this.em.remove(found);
      await this.em.flush();
    }
  }
}
