// === Entities ===
import { Address } from '../entities/address.enitity';
import { Admin } from '../entities/admin.entity';
import { AuthSession } from '../entities/auth.entity';
import { CouponEntity } from '../entities/coupon.entity';
import { FavoriteEntity } from '../entities/favorite.entity';
import { Food } from '../entities/food.entity';
import { MenuCategoryEntity } from '../entities/menu-category.entity';
import { MenuEntity } from '../entities/menu.entity';
import { NotificationEntity } from '../entities/notification.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { PaymentEntity } from '../entities/payment.entity';
import { ReservationEntity } from '../entities/reservation.entity';
import { RestaurantCategoryEntity } from '../entities/restaurant-category.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { ReviewEntity } from '../entities/review.entity';
import { SupportMessageEntity } from '../entities/support-message.entity';
import { Table } from '../entities/table.entity';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { WishlistEntity } from '../entities/wishlist.entity';

// === Primary IDs ===
export type AddressId = Address['id'];
export type AdminId = Admin['id'];
export type AuthSessionId = AuthSession['id'];
export type CouponId = CouponEntity['id'];
export type FavoriteId = FavoriteEntity['id'];
export type FoodId = Food['id'];
export type MenuId = MenuEntity['id'];
export type MenuCategoryId = MenuCategoryEntity['id'];
export type NotificationId = NotificationEntity['id'];
export type OrderItemId = OrderItemEntity['id'];
export type OrderId = OrderEntity['id'];
export type PaymentId = PaymentEntity['id'];
export type ReservationId = ReservationEntity['id'];
export type RestaurantId = Restaurant['id'];
export type ReviewId = ReviewEntity['id'];
export type SupportMessageId = SupportMessageEntity['id'];
export type TableId = Table['id'];
export type TransactionId = Transaction['id'];
export type UserId = User['id'];
export type WishlistId = WishlistEntity['id'];
export type RestaurantCategoryId = RestaurantCategoryEntity['id'];

// === Foreign Keys (NonNullable Relationships) ===

// User-related foreign keys
export type AddressUserId = NonNullable<Address['user']>['id'];
export type WishlistUserId = NonNullable<WishlistEntity['user']>['id'];
export type ReservationUserId = NonNullable<ReservationEntity['user']>['id'];
export type NotificationUserId = NonNullable<NotificationEntity['targetUser']>['id'];
export type SupportMessageUserId = NonNullable<SupportMessageEntity['receiverUser']>['id'];
export type TransactionUserId = NonNullable<Transaction['user']>['id'];
export type OrderUserId = NonNullable<OrderEntity['user']>['id'];
export type FavoriteUserId = NonNullable<FavoriteEntity['user']>['id'];
export type AuthUserId = NonNullable<AuthSession['user']>['id'];

// Restaurant-related foreign keys
export type AddressRestaurantId = NonNullable<Address['restaurant']>['id'];
export type ReservationRestaurantId = NonNullable<ReservationEntity['restaurant']>['id'];
export type OrderRestaurantId = NonNullable<OrderEntity['restaurant']>['id'];
export type FavoriteRestaurantId = NonNullable<FavoriteEntity['restaurant']>['id'];
export type FoodRestaurantId = NonNullable<Food['restaurant']>['id'];
export type MenuRestaurantId = NonNullable<MenuEntity['restaurant']>['id'];

// Food & Menu references
export type FoodMenuId = NonNullable<Food['menu']>['id'];
export type FoodCategoryId = NonNullable<Food['menuCategory']>['id'];
export type ReviewFoodId = NonNullable<ReviewEntity['food']>['id'];
export type ReviewRestaurantId = NonNullable<ReviewEntity['restaurant']>['id'];
export type FavoriteFoodId = NonNullable<FavoriteEntity['food']>['id'];
export type TableRestaurantId = NonNullable<Table['restaurant']>['id'];

// Other foreign keys
export type OrderItemOrderId = NonNullable<OrderItemEntity['order']>['id'];
export type PaymentOrderId = NonNullable<PaymentEntity['order']>['id'];
export type CouponRestaurantId = NonNullable<CouponEntity['restaurant']>['id'];

// === Unique Business Values ===
export type RestaurantName = Restaurant['name'];
export type CouponCode = CouponEntity['code'];
export type AdminEmail = Admin['email'];
export type UserEmail = User['email'];
export type Token = AuthSession['token'];
export type RefreshToken = AuthSession['refreshToken'];
