// src/infrastructure/database/repositories/auth-session.repository.impl.ts

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectEntityManager, InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthSessionEntity } from 'src/domain/entity/auth.entity';
import { IAuthSessionRepository } from 'src/domain/repository/auth-session.repository.interface';
import { AuthSessionId, UserId } from 'src/domain/types/entity-types';

@Injectable()
export class AuthSessionRepository implements IAuthSessionRepository {
  constructor(
    @InjectRepository(AuthSessionEntity, 'default')
    private readonly repo: EntityRepository<AuthSessionEntity>,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  // 🔍 Find session by access token
  async findByToken(token: AuthSessionEntity['token']): Promise<AuthSessionEntity | null> {
    return this.repo.findOne({ token });
  }

  // 🔍 Find session by refresh token
  async findByRefreshToken(
    refreshToken: AuthSessionEntity['refreshToken'],
  ): Promise<AuthSessionEntity | null> {
    return this.repo.findOne({ refreshToken });
  }

  // 🔍 Get all sessions for a given user
  async findByUserId(userId: UserId): Promise<AuthSessionEntity[]> {
    return this.repo.find({ user: { id: userId } });
  }

  // ➕ Add new session
  async create(session: AuthSessionEntity): Promise<void> {
    this.em.persist(session);
    await this.em.flush();
  }

  // ❌ Revoke a session (by marking it as revoked)
  async revoke(id: AuthSessionId): Promise<void> {
    const found = await this.repo.findOne({ id });
    if (found) {
      found.isRevoked = true;
      await this.em.flush();
    }
  }
}
