import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from 'src/domain/user/entities/user.entity';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { UserRole } from 'src/domain/user/entities/user-role.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User, 'default') // ✅ Add connection name
    private readonly userRepo: EntityRepository<User>,

    @InjectEntityManager('default') // ✅ Add connection name
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<User | null> {
    return await this.userRepo.findOne({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.findAll();
  }

  async create(user: User): Promise<User> {
    this.em.persist(user);
    await this.em.flush();
    return user;
  }

  async update(user: User): Promise<User> {
    await this.em.flush();
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      this.em.remove(user);
      await this.em.flush();
    }
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return await this.userRepo.find({ role });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepo.count({ email });
    return count > 0;
  }
}
