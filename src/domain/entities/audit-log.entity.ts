// src/domain/entity/audit-log.entity.ts

import { Entity, Property, PrimaryKey, ManyToOne, Index } from "@mikro-orm/core";
import { GraphQLJSONObject } from "graphql-scalars";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { AdminEntity } from "./admin.entity";

@ObjectType() // 📦 Expose this entity to GraphQL API consumers
@Entity() // 🏗️ MikroORM persistent table
export class AuditLogEntity {
  @Field(() => ID) // 🔗 Expose as GraphQL ID
  @PrimaryKey({ type: "uuid" }) // 🆔 Use UUID for primary key
  id: string = uuidv7(); // ➡️ Generate UUIDv7 as default

  @Field(() => AdminEntity) // 👤 Every log is tied to an admin
  @ManyToOne(() => AdminEntity) // 🗂️ Required reference to admin
  admin: AdminEntity;

  @Field() // 📋 Log action type/description
  @Property()
  action: string; // ➡️ E.g., "Deleted Coupon"

  @Field() // 🎯 Log target (entity name or ID)
  @Property()
  target: string; // ➡️ E.g., "MenuItem:123"

  @Field(() => GraphQLJSONObject) // 🗂️ Flexible details as JSON (for extra context)
  @Property({ type: "json" })
  details: Record<string, unknown>; // ➡️ E.g., old values, new values, etc.

  @Field() // 🕒 When the action was performed
  @Property({ type: "date", onCreate: () => new Date() })
  @Index() // 🏷️ (Optional but recommended) Index for fast range queries
  createdAt: Date = new Date();

  // No constructor needed; MikroORM will set properties automatically on persist
}
