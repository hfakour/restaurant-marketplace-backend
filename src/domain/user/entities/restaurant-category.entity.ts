import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';

@ObjectType() // 👈 GraphQL Object Type
@Entity()
export class RestaurantCategoryEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // 🆔 Unique ID using UUIDv7

  @Field()
  @Property()
  name: string; // 🍱 Category name (e.g., Italian, Sushi, Bakery)

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string; // 📝 Short description of the category

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string; // 🖼️ Optional image to represent the category in UI

  @Field(() => Boolean)
  @Property({ default: true })
  isActive: boolean = true; // ✅ Soft delete or deactivate a category

  @Field(() => Date)
  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date(); // 📅 Created date

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // 🔁 Updated date

  constructor(name: string, description?: string, imageUrl?: string) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
