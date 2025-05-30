import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { IRestaurantRepository } from 'src/domain/repository/restaurant.repository.interface';
import { Restaurant } from 'src/domain/entities/restaurant.entity';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(Restaurant, 'default') // ✅ Named DB connection
    private readonly restaurantRepo: EntityRepository<Restaurant>,

    @InjectEntityManager('default') // ✅ EntityManager for flush/persist
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<Restaurant | null> {
    return await this.restaurantRepo.findOne({ id });
  }

  async findByName(name: string): Promise<Restaurant | null> {
    return await this.restaurantRepo.findOne({ name });
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepo.findAll();
  }

  async create(restaurant: Restaurant): Promise<void> {
    this.em.persist(restaurant);
    await this.em.flush();
  }

  async update(restaurant: Restaurant): Promise<void> {
    this.em.persist(restaurant);
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const restaurant = await this.findById(id);
    if (restaurant) {
      this.em.remove(restaurant);
      await this.em.flush();
    }
  }

  async findByCategory(categoryId: string): Promise<Restaurant[]> {
    return await this.restaurantRepo.find({
      restaurantCategory: categoryId,
    });
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.restaurantRepo.count({ name });
    return count > 0;
  }
}
