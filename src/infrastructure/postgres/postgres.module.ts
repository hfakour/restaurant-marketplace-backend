// src/infrastructure/postgres/postgres.module.ts

import { Module } from '@nestjs/common';

// PostgreSQL repository implementations
import { UserRepository } from './repository/user.repository.impl';
import { AdminRepository } from './repository/admin.repository.impl';
import { AddressRepository } from './repository/address.repository.impl';
import { AuditLogRepository } from './repository/audit-log.repository.impl';
import { AuthSessionRepository } from './repository/auth-session.repository.impl';
import { CouponRepository } from './repository/coupon.repository.impl';
import { FavoriteRepository } from './repository/favorite.repository.impl';
import { FoodRepository } from './repository/food.repository.impl';
import { MenuCategoryRepository } from './repository/menu-category.repository.impl';
import { MenuRepository } from './repository/menu.repository.impl';
import { OrderItemRepository } from './repository/order-item.repository.impl';
import { OrderRepository } from './repository/order.repository.impl';
import { PaymentRepository } from './repository/payment.repository.impl';
import { RestaurantCategoryRepository } from './repository/restaurant-category.repository';
import { ReservationRepository } from './repository/reservation.repository.impl';
import { RestaurantRepository } from './repository/restaurant.repository.impl';
import { ReviewRepository } from './repository/review.repository.impl';
import { TableRepository } from './repository/table.repository.impl';
import { TransactionRepository } from './repository/transaction.repository.impl';
import { WishlistRepository } from './repository/wishlist.repository.impl';

// Import all your other PostgreSQL repositories similarly...

@Module({
  providers: [
    AddressRepository,
    AdminRepository,
    AuditLogRepository,
    AuthSessionRepository,
    CouponRepository,
    FavoriteRepository,
    FoodRepository,
    MenuCategoryRepository,
    MenuRepository,
    OrderItemRepository,
    OrderRepository,
    PaymentRepository,
    ReservationRepository,
    RestaurantCategoryRepository,
    RestaurantRepository,
    ReviewRepository,
    TableRepository,
    TransactionRepository,
    UserRepository,
    WishlistRepository,
    // Add other PostgreSQL providers here
  ],
  exports: [
    AddressRepository,
    AdminRepository,
    AuditLogRepository,
    AuthSessionRepository,
    CouponRepository,
    FavoriteRepository,
    FoodRepository,
    MenuCategoryRepository,
    MenuRepository,
    OrderItemRepository,
    OrderRepository,
    PaymentRepository,
    ReservationRepository,
    RestaurantCategoryRepository,
    RestaurantRepository,
    ReviewRepository,
    TableRepository,
    TransactionRepository,
    UserRepository,
    WishlistRepository,
    // Export them for injection in services
  ],
})
export class PostgresInfrastructureModule {}
