import { Entity, Property, PrimaryKey, ManyToOne, Embeddable, Embedded } from '@mikro-orm/core';
import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { Restaurant } from './restaurant.entity';
import { ReviewEntity } from './review.entity';
import { MenuCategoryEntity } from './menu-category.entity';
import { MenuEntity } from './menu.entity';

@Embeddable()
@ObjectType()
export class SizeOption {
  @Field()
  @Property()
  name: string; // e.g. Small, Medium, Large

  @Field(() => Float)
  @Property()
  additionalPrice: number; // Extra cost added to base price
}

@Embeddable()
@ObjectType()
export class ExtraOption {
  @Field()
  @Property()
  name: string; // e.g. Cheese, Sauce

  @Field(() => Float)
  @Property()
  additionalPrice: number;
}

@Embeddable()
@ObjectType()
export class CustomizationOption {
  @Field()
  @Property()
  name: string; // e.g. No Onion, Extra Spicy

  @Field()
  @Property()
  value: string; // Can be true/false or specific text
}

@ObjectType()
@Entity()
export class Food {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuidv7();

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  description: string;

  @Field(() => [String])
  @Property({ type: 'text[]' })
  ingredients: string[];

  @Field(() => [String])
  @Property({ type: 'text[]' })
  allergies: string[];

  @Field(() => [String])
  @Property({ type: 'text[]' })
  tags: string[];

  @Field(() => Float)
  @Property()
  basePrice: number;

  @Field()
  @Property()
  imageUrl: string;

  @Field()
  @Property()
  isAvailable: boolean;

  @Field()
  @Property()
  preparationTime: string; // e.g. "15-20 mins"

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  discount?: number;

  @Field(() => MenuEntity)
  @ManyToOne(() => MenuEntity)
  menu: MenuEntity;

  // 🧀 Extra options with price impact
  @Field(() => [ExtraOption])
  @Embedded(() => ExtraOption, { array: true })
  extras: ExtraOption[] = [];

  // ⚙️ Customizations with values
  @Field(() => [CustomizationOption])
  @Embedded(() => CustomizationOption, { array: true })
  customizations: CustomizationOption[] = [];

  // 🔠 Size options with price variance
  @Field(() => [SizeOption])
  @Embedded(() => SizeOption, { array: true })
  sizes: SizeOption[] = [];

  // 🔗 Relationships
  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Field(() => MenuCategoryEntity)
  @ManyToOne(() => MenuCategoryEntity)
  menuCategory: MenuCategoryEntity; // ✅ matches `food => food.menuCategory`

  @Field(() => [ReviewEntity])
  @Property({ persist: false }) // Loaded through service
  reviews?: ReviewEntity[];

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
