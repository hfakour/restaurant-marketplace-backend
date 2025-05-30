// src/domain/entity/admin.entity.ts
import { Entity, Property, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Restaurant } from './restaurant.entity';
import { AdminRole } from './admin-role.enum';

@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7();

  @Field()
  @Property()
  email: string;

  @Field()
  @Property()
  password: string;

  @Field(() => AdminRole)
  @Enum(() => AdminRole)
  role: AdminRole;

  @Field({ nullable: true })
  @ManyToOne(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string;

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // ✅ Constructor to match your service code
  constructor(email: string, password: string, role: AdminRole) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
