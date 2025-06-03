import { Entity, Property, PrimaryKey, OneToMany, Collection, Enum, Index } from "@mikro-orm/core";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { v7 } from "uuid";

import { AddressEntity } from "./address.entity";
import { ReviewEntity } from "./review.entity";
import { WishlistEntity } from "./wishlist.entity";
import { OrderEntity } from "./order.entity";
import { ReservationEntity } from "./reservation.entity";
import { FavoriteEntity } from "./favorite.entity";
import { UserRole } from "../enums/user-role.enum";

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v7();

  @Field()
  @Property({ unique: true })
  @Index() // Fast lookup by email
  email: string;

  /**
   * Hashed password, NEVER expose in GraphQL or REST
   */
  @Property({ hidden: true })
  password: string;

  @Field(() => UserRole)
  @Enum(() => UserRole)
  @Index()
  role: UserRole;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  imageUrl?: string;

  @Field(() => [AddressEntity])
  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses = new Collection<AddressEntity>(this);

  @Field(() => [ReviewEntity])
  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews = new Collection<ReviewEntity>(this);

  @Field(() => [WishlistEntity])
  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlists = new Collection<WishlistEntity>(this);

  @Field(() => [FavoriteEntity])
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites = new Collection<FavoriteEntity>(this);

  @Field(() => [OrderEntity])
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders = new Collection<OrderEntity>(this);

  @Field(() => [ReservationEntity])
  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations = new Collection<ReservationEntity>(this);

  @Field()
  @Property({ type: "date", onCreate: () => new Date() })
  @Index()
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(email: string, password: string, role: UserRole) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
