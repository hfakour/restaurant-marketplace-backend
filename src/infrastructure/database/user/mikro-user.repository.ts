import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class MikroUserRepository implements IUserRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: string): Promise<User | null> {
    // Find a user by UUID
    return await this.em.findOne(User, { id });
  }

  async findByEmail(email: string): Promise<User | null> {
    // Find a user by email (used for login or validation)
    return await this.em.findOne(User, { email });
  }

  async create(user: User): Promise<User> {
    // Persist and flush new user
    this.em.persist(user);
    await this.em.flush();
    return user;
  }

  async update(user: User): Promise<User> {
    // Persist and flush updated user
    this.em.persist(user);
    await this.em.flush();
    return user;
  }

  async delete(id: string): Promise<void> {
    // Delete user by ID
    await this.em.nativeDelete(User, { id });
  }

  async findAll(): Promise<User[]> {
    // Return all users
    return await this.em.find(User, {});
  }
}
