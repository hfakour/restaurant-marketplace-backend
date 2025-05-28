import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { WishlistEntity } from 'src/domain/user/entities/wishlist.entity';
import { IWishlistRepository } from 'src/domain/user/repository/wishlist.repository.interface';

@Injectable()
export class WishlistRepository implements IWishlistRepository {
  constructor(
    @InjectRepository(WishlistEntity, 'default')
    private readonly wishlistRepo: EntityRepository<WishlistEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<WishlistEntity | null> {
    return await this.wishlistRepo.findOne({ id });
  }

  async findByUserId(userId: string): Promise<WishlistEntity[]> {
    return await this.wishlistRepo.find({ user: userId });
  }

  async create(wishlist: WishlistEntity): Promise<WishlistEntity> {
    this.em.persist(wishlist);
    await this.em.flush();
    return wishlist;
  }

  async update(wishlist: WishlistEntity): Promise<WishlistEntity> {
    await this.em.flush();
    return wishlist;
  }

  async delete(id: string): Promise<void> {
    const wishlist = await this.findById(id);
    if (wishlist) {
      this.em.remove(wishlist);
      await this.em.flush();
    }
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.wishlistRepo.count({ id });
    return count > 0;
  }
}
