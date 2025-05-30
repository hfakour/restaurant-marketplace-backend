import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user.entity';

@ObjectType() // 👁️ Expose this entity in GraphQL schema
@Entity() // 🏷️ MikroORM Entity Declaration
export class AuthSession {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🆔 Unique session identifier

  @Field()
  @Property()
  token: string; // 🔐 Access token (JWT or session token)

  @Field()
  @Property()
  refreshToken: string; // 🔁 Used to refresh expired access tokens

  @Field()
  @Property()
  expiresIn: number; // ⏳ Duration in seconds (e.g. 3600 for 1 hour)

  @Field()
  @Property()
  deviceId: string; // 📱 Helps identify the session device

  @Field()
  @Property()
  ipAddress: string; // 🌐 Client's IP address

  @Field()
  @Property()
  userAgent: string; // 💻 Device/browser information

  @Field()
  @Property({ type: 'date' })
  loginAt: Date = new Date(); // 📅 Session creation timestamp

  @Field()
  @Property({ default: false })
  isRevoked: boolean = false; // ❌ Used for logging out or invalidating a session

  @Field(() => User)
  @ManyToOne(() => User)
  user: User; // 🔗 Relational mapping to User entity

  // ✅ Constructor receives `User` object, not just userId
  constructor(params: {
    token: string;
    refreshToken: string;
    deviceId: string;
    ipAddress: string;
    userAgent: string;
    expiresIn: number;
    user: User; // 👈 fix: pass whole User object
  }) {
    this.token = params.token;
    this.refreshToken = params.refreshToken;
    this.deviceId = params.deviceId;
    this.ipAddress = params.ipAddress;
    this.userAgent = params.userAgent;
    this.expiresIn = params.expiresIn;
    this.user = params.user; // ✅ Assign actual User entity
  }
}
