// src/application/services/auth-session.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { IAuthSessionRepository } from 'src/domain/repository/auth-session.repository.interface';
import { AuthSession } from 'src/domain/entities/auth.entity';
import { User } from 'src/domain/entities/user.entity';

import { Token, RefreshToken, AuthUserId, AuthSessionId } from 'src/domain/types/entity-types';

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly sessionRepo: IAuthSessionRepository,
    private readonly em: EntityManager, // 🧠 Required for referencing user entity without full load
  ) {}

  // ✅ Create a new auth session after login
  async create(params: {
    token: Token;
    refreshToken: RefreshToken;
    expiresIn: number;
    deviceId: string;
    ipAddress: string;
    userAgent: string;
    userId: AuthUserId;
  }): Promise<void> {
    const user = this.em.getReference(User, params.userId); // 🔗 lightweight reference to User

    const session = new AuthSession({
      token: params.token,
      refreshToken: params.refreshToken,
      deviceId: params.deviceId,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      expiresIn: params.expiresIn,
      user, // 🧑‍💻 pass referenced User entity
    });

    await this.sessionRepo.create(session); // 💾 Save new session
  }

  // ✅ Revoke an auth session (e.g. logout)
  async revoke(sessionId: AuthSessionId): Promise<void> {
    await this.sessionRepo.revoke(sessionId);
  }

  // 🔍 Find session by access token
  async getByToken(token: Token): Promise<AuthSession | null> {
    return this.sessionRepo.findByToken(token);
  }

  // 🔍 Find session by refresh token
  async getByRefreshToken(refreshToken: RefreshToken): Promise<AuthSession | null> {
    return this.sessionRepo.findByRefreshToken(refreshToken);
  }

  // 🔍 List all active sessions for a user (useful for "Logged in Devices" screen)
  async getByUserId(userId: AuthUserId): Promise<AuthSession[]> {
    return this.sessionRepo.findByUserId(userId);
  }
}
