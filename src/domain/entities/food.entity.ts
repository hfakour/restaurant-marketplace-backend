import { Entity, Property, PrimaryKey, ManyToOne, Embedded, Index } from "@mikro-orm/core";
import { ObjectType, Field, Float, ID } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";
import { RestaurantEntity } from "./restaurant.entity";
import { ReviewEntity } from "./review.entity";
import { MenuCategoryEntity } from "./menu-category.entity";
import { MenuEntity } from "./menu.entity";
import { SizeOption } from "../value-object/size-option.vo";
import { ExtraOption } from "../value-object/extra-option.vo";
import { CustomizationOption } from "../value-object/customization-option.vo";

@ObjectType()
@Entity()
export class FoodEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = uuidv7();

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  description: string;

  @Field(() => [String])
  @Property({ type: "text[]" })
  ingredients: string[];

  @Field(() => [String])
  @Property({ type: "text[]" })
  allergies: string[];

  @Field(() => [String])
  @Property({ type: "text[]" })
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

  @Field(() => [ExtraOption])
  @Embedded(() => ExtraOption, { array: true })
  extras: ExtraOption[] = [];

  @Field(() => [CustomizationOption])
  @Embedded(() => CustomizationOption, { array: true })
  customizations: CustomizationOption[] = [];

  @Field(() => [SizeOption])
  @Embedded(() => SizeOption, { array: true })
  sizes: SizeOption[] = [];

  @Field(() => RestaurantEntity)
  @ManyToOne(() => RestaurantEntity)
  @Index()
  restaurant: RestaurantEntity;

  @Field(() => MenuCategoryEntity)
  @ManyToOne(() => MenuCategoryEntity)
  @Index()
  menuCategory: MenuCategoryEntity;

  @Field(() => [ReviewEntity], { nullable: true })
  @Property({ persist: false }) // Loaded via service/query resolver
  reviews?: ReviewEntity[];

  @Field()
  @Property({ type: "date", onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
