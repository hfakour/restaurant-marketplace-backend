// src/infrastructure/database/repositories/review.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { ReviewEntity } from 'src/domain/entities/review.entity';
import { IReviewRepository } from 'src/domain/repository/review.repository.interface';
import { Restaurant } from 'src/domain/entities/restaurant.entity';
import { Food } from 'src/domain/entities/food.entity';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity, 'default')
    private readonly repo: EntityRepository<ReviewEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find review by its ID
  async findById(id: ReviewEntity['id']): Promise<ReviewEntity | null> {
    return this.repo.findOne({ id });
  }

  // 🔍 Get all reviews for a specific restaurant
  async findByRestaurant(restaurantId: Restaurant['id']): Promise<ReviewEntity[]> {
    return this.repo.find({ restaurant: { id: restaurantId } });
  }

  // 🔍 Get all reviews for a specific food item
  async findByFood(foodId: Food['id']): Promise<ReviewEntity[]> {
    return this.repo.find({ food: { id: foodId } });
  }

  // ➕ Add new review
  async create(review: ReviewEntity): Promise<void> {
    this.em.persist(review);
    await this.em.flush();
  }

  // 🔄 Update existing review
  async update(review: ReviewEntity): Promise<void> {
    this.em.persist(review);
    await this.em.flush();
  }

  // ❌ Delete review by ID
  async delete(id: ReviewEntity['id']): Promise<void> {
    const review = await this.findById(id);
    if (review) {
      this.em.remove(review);
      await this.em.flush();
    }
  }
}
