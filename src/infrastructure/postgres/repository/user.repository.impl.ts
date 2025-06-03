// src/infrastructure/database/repositories/user.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

import { UserEntity } from 'src/domain/entity/user.entity';
import { IUserRepository } from 'src/domain/repository/user.repository.interface';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { UserEmail, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity, 'default')
    private readonly userRepo: EntityRepository<UserEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find user by ID
  async findById(id: UserId): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ id });
  }

  // 🔍 Find user by email
  async findByEmail(email: UserEmail): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ email });
  }

  // 🔍 Get all users
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.findAll();
  }

  // ➕ Add new user
  async create(user: UserEntity): Promise<void> {
    this.em.persist(user);
    await this.em.flush();
  }

  // 🔄 Update existing user
  async update(user: UserEntity): Promise<void> {
    this.em.persist(user);
    await this.em.flush();
  }

  // ❌ Delete user by ID
  async delete(id: UserId): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      this.em.remove(user);
      await this.em.flush();
    }
  }

  // 🔍 Find users by their role (Admin, Customer, etc.)
  async findByRole(role: UserRole): Promise<UserEntity[]> {
    return await this.userRepo.find({ role });
  }

  // ✅ Check if user with given email exists
  async existsByEmail(email: UserEmail): Promise<boolean> {
    const count = await this.userRepo.count({ email });
    return count > 0;
  }

  // ✅ FIXED: Flexible filter method using the correct repository
  async filterBy(filter: { email?: UserEmail; role?: UserRole }): Promise<UserEntity[]> {
    return await this.userRepo.find({
      ...(filter.email ? { email: filter.email } : {}),
      ...(filter.role ? { role: filter.role } : {}),
    });
  }
}
