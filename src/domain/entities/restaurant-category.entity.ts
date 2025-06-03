import { Entity, PrimaryKey, Property, Index } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { v7 as uuidv7 } from "uuid";

@ObjectType()
@Entity()
export class RestaurantCategoryEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" }) // Explicit UUID for DB
  id: string = uuidv7();

  @Field()
  @Property({ unique: true }) // Prevents duplicates
  @Index() // Fast lookup by name
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string;

  @Field({ defaultValue: true })
  @Property({ default: true })
  @Index() // Quick filter for active categories
  isActive: boolean = true;

  @Field(() => Date)
  @Property({ type: "date", onCreate: () => new Date() })
  @Index() // Useful for sorting by newest
  createdAt: Date = new Date();

  @Field(() => Date)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(name: string, description?: string, imageUrl?: string) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
