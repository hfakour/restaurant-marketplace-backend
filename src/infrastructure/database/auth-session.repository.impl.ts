// src/infrastructure/database/repositories/auth-session.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthSession } from 'src/domain/user/entities/auth.entity';
import { IAuthSessionRepository } from 'src/domain/user/repository/auth-session.repository.interface';
import { User } from 'src/domain/user/entities/user.entity'; // 👈 Import User for typing

@Injectable()
export class AuthSessionRepository implements IAuthSessionRepository {
  constructor(
    @InjectRepository(AuthSession, 'default')
    private readonly repo: EntityRepository<AuthSession>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find session by access token
  async findByToken(token: AuthSession['token']): Promise<AuthSession | null> {
    return this.repo.findOne({ token });
  }

  // 🔍 Find session by refresh token
  async findByRefreshToken(refreshToken: AuthSession['refreshToken']): Promise<AuthSession | null> {
    return this.repo.findOne({ refreshToken });
  }

  // 🔍 Get all sessions for a given user
  async findByUserId(userId: User['id']): Promise<AuthSession[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // ➕ Add new session
  async create(session: AuthSession): Promise<void> {
    this.em.persist(session);
    await this.em.flush();
  }

  // ❌ Revoke a session (by marking it as revoked)
  async revoke(id: AuthSession['id']): Promise<void> {
    const found = await this.repo.findOne({ id });
    if (found) {
      found.isRevoked = true;
      await this.em.flush();
    }
  }
}
