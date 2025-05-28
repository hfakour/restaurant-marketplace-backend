import { Entity, Property, PrimaryKey, OneToMany, Collection, Enum } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v7 } from 'uuid';

import { Address } from './address.enitity'; // Assuming Address entity exists
import { ReviewEntity } from './review.entity';
import { WishlistEntity } from './wishlist.entity';
import { OrderEntity } from './order.entity';
import { ReservationEntity } from './reservation.entity';
import { FavoriteEntity } from './favorite.entity';
import { UserRole } from './user-role.enum';

@ObjectType() // GraphQL type
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey()
  id: string = v7(); // Unique UUID v7 for User ID

  @Field()
  @Property({ unique: true })
  email: string; // User email, unique

  @Property()
  password: string; // Stored hashed password, NOT exposed via GraphQL

  @Field(() => UserRole)
  @Enum(() => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fullName?: string; // User's full name (optional)

  @Field({ nullable: true })
  @Property({ nullable: true })
  phone?: string; // User phone number (optional)

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string; // User profile image URL (optional)

  // OneToOne or OneToMany depending on design; assuming user can have multiple addresses
  @Field(() => [Address], { nullable: true })
  @OneToMany(() => Address, (address) => address.user, { nullable: true })
  addresses = new Collection<Address>(this); // User's saved addresses

  @Field(() => [ReviewEntity], { nullable: true })
  @OneToMany(() => ReviewEntity, (review) => review.user, { nullable: true })
  reviews = new Collection<ReviewEntity>(this); // Reviews written by user

  @Field(() => [WishlistEntity], { nullable: true })
  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user, { nullable: true })
  wishlists = new Collection<WishlistEntity>(this); // User's wishlists or favorite items

  @Field(() => [FavoriteEntity], { nullable: true })
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user, { nullable: true })
  favorites = new Collection<FavoriteEntity>(this); // ❤️ Favorite foods/restaurants

  @Field(() => [OrderEntity], { nullable: true })
  @OneToMany(() => OrderEntity, (order) => order.user, { nullable: true })
  orders = new Collection<OrderEntity>(this); // Orders placed by user

  @Field(() => [ReservationEntity], { nullable: true })
  @OneToMany(() => ReservationEntity, (ReservationEntity) => ReservationEntity.user, {
    nullable: true,
  })
  reservations = new Collection<ReservationEntity>(this); // Table reservations made by user

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date(); // Timestamp of user creation

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); // Timestamp of last update

  constructor(email: string, password: string, role: UserRole) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
