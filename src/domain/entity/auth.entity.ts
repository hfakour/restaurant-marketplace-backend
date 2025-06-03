import { Entity, Property, PrimaryKey, ManyToOne, Index } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { UserEntity } from './user.entity';

@ObjectType() // 👁️ Expose this entity in GraphQL schema (used in backend only; tokens should be hidden in GraphQL API)
@Entity() // 🏷️ MikroORM Entity Declaration
export class AuthSessionEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' }) // 🆔 Use UUID for primary key
  id: string = uuidv7(); // ➡️ Generate UUIDv7 by default

  // 🔐 JWT or session token - should NOT be exposed in GraphQL except for login/mutation responses
  @Property()
  @Index() // ⚡ Fast lookup by token (optional)
  token: string;

  // 🔁 Used to refresh access tokens - should NOT be exposed in GraphQL
  @Property()
  @Index()
  refreshToken: string;

  // ⏳ Duration in seconds (e.g., 3600 for 1 hour)
  @Field()
  @Property()
  expiresIn: number;

  // 📱 Device/session identifier (e.g., mobile UUID or browser fingerprint)
  @Field()
  @Property()
  deviceId: string;

  // 🌐 Client's IP address (can be useful for analytics, fraud prevention)
  @Field()
  @Property()
  ipAddress: string;

  // 💻 User agent string
  @Field()
  @Property()
  userAgent: string;

  // 📅 Session creation timestamp
  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  loginAt: Date = new Date();

  // ❌ Used for logging out or invalidating a session
  @Field()
  @Property({ default: false })
  @Index() // ⚡ For efficient revoked-session queries
  isRevoked: boolean = false;

  // 🔗 Relational mapping to User entity
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @Index() // ⚡ Query all sessions for a user
  user: UserEntity;

  // ✅ Constructor for clarity and maintainability
  constructor(params: {
    token: string;
    refreshToken: string;
    deviceId: string;
    ipAddress: string;
    userAgent: string;
    expiresIn: number;
    user: UserEntity;
    isRevoked?: boolean; // Allow override for testing/seed data
  }) {
    this.token = params.token;
    this.refreshToken = params.refreshToken;
    this.deviceId = params.deviceId;
    this.ipAddress = params.ipAddress;
    this.userAgent = params.userAgent;
    this.expiresIn = params.expiresIn;
    this.user = params.user;
    this.isRevoked = params.isRevoked ?? false;
  }
}
