// src/application/services/review.service.ts

import { Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { IReviewRepository } from 'src/domain/repository/review.repository.interface';

import { ReviewId, ReviewRestaurantId, ReviewFoodId } from 'src/domain/types/entity-types';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepo: IReviewRepository) {}

  async findById(id: ReviewId): Promise<ReviewEntity | null> {
    // 🔍 Fetch a single review by ID
    return this.reviewRepo.findById(id);
  }

  async findByRestaurant(restaurantId: ReviewRestaurantId): Promise<ReviewEntity[]> {
    // 🍽️ Get all reviews for a restaurant
    return this.reviewRepo.findByRestaurant(restaurantId);
  }

  async findByFood(foodId: ReviewFoodId): Promise<ReviewEntity[]> {
    // 🍔 Get all reviews for a food item
    return this.reviewRepo.findByFood(foodId);
  }

  async create(review: ReviewEntity): Promise<void> {
    // 📝 Create a new review
    await this.reviewRepo.create(review);
  }

  async update(review: ReviewEntity): Promise<void> {
    // ✏️ Edit a review
    await this.reviewRepo.update(review);
  }

  async delete(id: ReviewId): Promise<void> {
    // ❌ Remove a review
    await this.reviewRepo.delete(id);
  }
}
