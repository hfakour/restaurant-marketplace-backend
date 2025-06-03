import { Entity, Property, PrimaryKey, OneToMany, Collection, Index } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 as uuidv7 } from 'uuid';
import { FoodEntity } from './food.entity';

@ObjectType()
@Entity()
export class MenuCategoryEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' }) // Use UUID v7 for uniqueness and sortability
  id: string = uuidv7();

  @Field()
  @Property({ unique: true })
  @Index() // Fast lookup by name
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  iconUrl?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  @Index() // For sorting in admin UI
  displayOrder?: number;

  @Field({ defaultValue: true })
  @Property({ default: true })
  @Index() // Filter active categories quickly
  isActive: boolean = true;

  @Field(() => [FoodEntity])
  @OneToMany(() => FoodEntity, (food) => food.menuCategory)
  foods = new Collection<FoodEntity>(this);

  // (Optional for admin/history)
  @Field()
  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
