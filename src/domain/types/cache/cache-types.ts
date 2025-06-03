// === Redis Cache Types ===

import { UserEntity } from 'src/domain/entity/user.entity';
import { UserId } from '../entity-types';

// Stores a short-lived OTP code (e.g. "936421")
export type OtpCode = `${number}`; // Enforces numeric string

// Stores a serialized session token (JWT or random string)
export type SessionToken = string; // Plain or JWT

// Stores minimal user cache data (e.g. for quick access to public profile)
export type UserCache = {
  id: UserId;
  fullName?: string;
  email: string;
  imageUrl?: string;
};

export class UserMapper {
  static toCache(user: UserEntity): UserCache {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl,
    };
  }

  static fromCache(data: UserCache): Partial<UserEntity> {
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      imageUrl: data.imageUrl,
    };
  }
}

// 🍞 Lightweight version of wishlist to store in cache
export type CachedWishlist = {
  id: string;
  title?: string;
  foodIds: string[];
  restaurantIds: string[];
  createdAt: string;
  updatedAt: string;
};
