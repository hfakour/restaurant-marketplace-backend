// src/domain/entity/audit-log.entity.ts
import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Admin } from './admin.entity';

@ObjectType()
@Entity()
export class AuditLog {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7();

  @Field(() => Admin)
  @ManyToOne(() => Admin)
  admin: Admin;

  @Field()
  @Property()
  action: string; // e.g., "Updated Menu Item", "Deleted Coupon"

  @Field()
  @Property()
  target: string; // e.g., entity name or ID

  @Field()
  @Property({ type: 'json' })
  details: Record<string, any>; // Optional JSON payload for context

  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();
}
