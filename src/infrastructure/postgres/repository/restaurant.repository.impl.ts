import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { IRestaurantRepository } from 'src/domain/repository/restaurant.repository.interface';
import { RestaurantEntity } from 'src/domain/entity/restaurant.entity';
import { RestaurantCategoryId, RestaurantId, RestaurantName } from 'src/domain/types/entity-types';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(RestaurantEntity, 'default') // ✅ Named DB connection
    private readonly restaurantRepo: EntityRepository<RestaurantEntity>,

    @InjectEntityManager('default') // ✅ EntityManager for flush/persist
    private readonly em: EntityManager,
  ) {}

  async findById(id: RestaurantId): Promise<RestaurantEntity | null> {
    return await this.restaurantRepo.findOne({ id });
  }

  async findByName(name: RestaurantName): Promise<RestaurantEntity | null> {
    return await this.restaurantRepo.findOne({ name });
  }

  async findAll(): Promise<RestaurantEntity[]> {
    return await this.restaurantRepo.findAll();
  }

  async create(restaurant: RestaurantEntity): Promise<void> {
    this.em.persist(restaurant);
    await this.em.flush();
  }

  async update(restaurant: RestaurantEntity): Promise<void> {
    this.em.persist(restaurant);
    await this.em.flush();
  }

  async delete(id: RestaurantId): Promise<void> {
    const restaurant = await this.findById(id);
    if (restaurant) {
      this.em.remove(restaurant);
      await this.em.flush();
    }
  }

  async findByCategory(categoryId: RestaurantCategoryId): Promise<RestaurantEntity[]> {
    return await this.restaurantRepo.find({
      restaurantCategory: categoryId,
    });
  }

  async existsByName(name: RestaurantName): Promise<boolean> {
    const count = await this.restaurantRepo.count({ name });
    return count > 0;
  }
}
