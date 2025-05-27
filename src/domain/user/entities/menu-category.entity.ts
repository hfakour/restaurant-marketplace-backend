import { Entity, Property, PrimaryKey, OneToMany, Collection } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Food } from './food.entity';

@ObjectType()
@Entity()
export class MenuCategoryEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7(); // ✅ Unique identifier for category

  @Field()
  @Property({ unique: true })
  name: string; // 🍕 e.g., Appetizers, Main Course, Desserts

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string; // 📋 Optional: short description of this category

  @Field({ nullable: true })
  @Property({ nullable: true })
  iconUrl?: string; // 🎨 Optional: Icon/image for visual UI

  @Field({ nullable: true })
  @Property({ nullable: true })
  displayOrder?: number; // 📊 Optional: used to sort categories

  @Field({ defaultValue: true })
  @Property({ default: true })
  isActive: boolean = true; // ✅ Soft toggle for enabling/disabling category

  @OneToMany(() => Food, (food) => food.menuCategory)
  foods = new Collection<Food>(this); // 🍽️ All food items that belong to this category
}
