import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/domain/user/entities/review.entity';
import { IReviewRepository } from 'src/domain/user/repository/review.repository.interface';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity, 'default')
    private readonly repo: EntityRepository<ReviewEntity>,
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string) {
    return this.repo.findOne({ id });
  }
  async findByRestaurant(restaurantId: string) {
    return this.repo.find({ restaurant: restaurantId });
  }
  async findByFood(foodId: string) {
    return this.repo.find({ food: foodId });
  }
  async create(review: ReviewEntity) {
    this.em.persist(review);
    await this.em.flush();
    return review;
  }
  async update(review: ReviewEntity) {
    await this.em.flush();
    return review;
  }
  async delete(id: string) {
    const review = await this.findById(id);
    if (review) {
      this.em.remove(review);
      await this.em.flush();
    }
  }
}
