// ===========================
// === DOMAIN ENTITY TYPES ===
// ===========================

// === Import Domain Entities ===
import { AddressEntity } from "../entities/address.entity";
import { AdminEntity } from "../entities/admin.entity";
import { AuditLogEntity } from "../entities/audit-log.entity";
import { AuthSessionEntity } from "../entities/auth.entity";
import { CouponEntity } from "../entities/coupon.entity";
import { FavoriteEntity } from "../entities/favorite.entity";
import { FoodEntity } from "../entities/food.entity";
import { MenuCategoryEntity } from "../entities/menu-category.entity";
import { MenuEntity } from "../entities/menu.entity";
import { NotificationEntity } from "../entities/notification.entity";
import { OrderItemEntity } from "../entities/order-item.entity";
import { OrderEntity } from "../entities/order.entity";
import { PaymentEntity } from "../entities/payment.entity";
import { ReservationEntity } from "../entities/reservation.entity";
import { RestaurantCategoryEntity } from "../entities/restaurant-category.entity";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { ReviewEntity } from "../entities/review.entity";
import { SupportMessageEntity } from "../entities/support-message.entity";
import { TableEntity } from "../entities/table.entity";
import { TransactionEntity } from "../entities/transaction.entity";
import { UserEntity } from "../entities/user.entity";
import { WishlistEntity } from "../entities/wishlist.entity";

// ===================================
// === PRIMARY KEYS (ENTITY IDs)   ===
// ===================================
export type AddressId = AddressEntity["id"];
export type AdminId = AdminEntity["id"];
export type AuditLogId = AuditLogEntity["id"];
export type AuthSessionId = AuthSessionEntity["id"];
export type CouponId = CouponEntity["id"];
export type FavoriteId = FavoriteEntity["id"];
export type FoodId = FoodEntity["id"];
export type MenuCategoryId = MenuCategoryEntity["id"];
export type MenuId = MenuEntity["id"];
export type NotificationId = NotificationEntity["id"];
export type OrderItemId = OrderItemEntity["id"];
export type OrderId = OrderEntity["id"];
export type PaymentId = PaymentEntity["id"];
export type ReservationId = ReservationEntity["id"];
export type RestaurantCategoryId = RestaurantCategoryEntity["id"];
export type RestaurantId = RestaurantEntity["id"];
export type ReviewId = ReviewEntity["id"];
export type SupportMessageId = SupportMessageEntity["id"];
export type TableId = TableEntity["id"];
export type TransactionId = TransactionEntity["id"];
export type UserId = UserEntity["id"];
export type WishlistId = WishlistEntity["id"];

// ========================================
// === FOREIGN KEYS (Relationships)     ===
// ========================================

// === User Foreign Keys ===
export type AddressUserId = NonNullable<AddressEntity["user"]>["id"];
export type WishlistUserId = NonNullable<WishlistEntity["user"]>["id"];
export type ReservationUserId = NonNullable<ReservationEntity["user"]>["id"];
export type NotificationUserId = NonNullable<NotificationEntity["targetUser"]>["id"];
export type SupportMessageReceiverUserId = NonNullable<SupportMessageEntity["receiverUser"]>["id"];
export type SupportMessageSenderUserId = NonNullable<SupportMessageEntity["senderUser"]>["id"];
export type TransactionUserId = NonNullable<TransactionEntity["user"]>["id"];
export type OrderUserId = NonNullable<OrderEntity["user"]>["id"];
export type FavoriteUserId = NonNullable<FavoriteEntity["user"]>["id"];
export type AuthSessionUserId = NonNullable<AuthSessionEntity["user"]>["id"];
export type ReviewUserId = NonNullable<ReviewEntity["user"]>["id"];

// === Restaurant Foreign Keys ===
export type AddressRestaurantId = NonNullable<AddressEntity["restaurant"]>["id"];
export type AdminRestaurantId = NonNullable<AdminEntity["restaurant"]>["id"];
export type TransactionRestaurantId = NonNullable<TransactionEntity["restaurant"]>["id"];
export type ReservationRestaurantId = NonNullable<ReservationEntity["restaurant"]>["id"];
export type ReviewRestaurantId = NonNullable<ReviewEntity["restaurant"]>["id"];
export type OrderRestaurantId = NonNullable<OrderEntity["restaurant"]>["id"];
export type FavoriteRestaurantId = NonNullable<FavoriteEntity["restaurant"]>["id"];
export type FoodRestaurantId = NonNullable<FoodEntity["restaurant"]>["id"];
export type MenuRestaurantId = NonNullable<MenuEntity["restaurant"]>["id"];
export type NotificationRestaurantId = NonNullable<NotificationEntity["targetRestaurant"]>["id"];
export type TableRestaurantId = NonNullable<TableEntity["restaurant"]>["id"];

// === Food & Menu Foreign Keys ===
export type FoodMenuId = NonNullable<FoodEntity["menu"]>["id"];
export type FoodCategoryId = NonNullable<FoodEntity["menuCategory"]>["id"];
export type ReviewFoodId = NonNullable<ReviewEntity["food"]>["id"];
export type FavoriteFoodId = NonNullable<FavoriteEntity["food"]>["id"];
export type OrderItemFoodId = NonNullable<OrderItemEntity["food"]>["id"];

// === Coupon, Payment, Order Foreign Keys ===
export type CouponRestaurantId = NonNullable<CouponEntity["ownerRestaurant"]>["id"];
export type PaymentOrderId = NonNullable<PaymentEntity["order"]>["id"];
export type OrderItemOrderId = NonNullable<OrderItemEntity["order"]>["id"];
export type OrderAddressId = NonNullable<OrderEntity["deliveryAddress"]>["id"];
export type OrderPaymentId = NonNullable<OrderEntity["payment"]>["id"];
export type OrderCouponId = NonNullable<OrderEntity["coupon"]>["id"];
export type TransactionOrderId = NonNullable<TransactionEntity["order"]>["id"];

// // === Support & Notification Foreign Keys ===
export type AuditLogAdminId = NonNullable<AuditLogEntity["admin"]>["id"];
export type NotificationSupportMessageId = NonNullable<NotificationEntity["supportMessage"]>["id"];
export type SupportMessageRestaurantId = NonNullable<SupportMessageEntity["restaurant"]>["id"];

// === Reservation Foreign Keys ===
export type ReservationTableId = NonNullable<ReservationEntity["table"]>["id"];

// =========================================
// === UNIQUE BUSINESS VALUE TYPES       ===
// =========================================
export type RestaurantName = RestaurantEntity["name"];
export type FoodName = FoodEntity["name"];
export type MenuCategoryName = MenuCategoryEntity["name"];
export type MenuCategoryIconUrl = MenuCategoryEntity["iconUrl"];
export type CouponCode = CouponEntity["code"];
export type AdminEmail = AdminEntity["email"];
export type UserEmail = UserEntity["email"];
export type Token = AuthSessionEntity["token"];
export type RefreshToken = AuthSessionEntity["refreshToken"];
export type CouponMinOrderTotal = CouponEntity["minOrderTotal"];
export type FavoriteNote = FavoriteEntity["note"];
export type MenuTitle = MenuEntity["title"];

// // === Wishlist-Specific Types ===
export type WishlistFoodId = FoodEntity["id"]; // Collection<FoodEntity>
export type WishlistRestaurantId = RestaurantEntity["id"]; // Collection<RestaurantEntity>
export type WishlistTitle = WishlistEntity["title"];

// ===============================
// === ENTITY COLLECTION TYPES ===
// ===============================
// (For reference in services or DTOs)
export type AddressCollection = AddressEntity[];
export type RestaurantCollection = RestaurantEntity[];
export type FoodCollection = FoodEntity[];
export type MenuCollection = MenuEntity[];
export type MenuCategoryCollection = MenuCategoryEntity[];
export type WishlistCollection = WishlistEntity[];
export type ReservationCollection = ReservationEntity[];
export type OrderCollection = OrderEntity[];
export type PaymentCollection = PaymentEntity[];
export type TransactionCollection = TransactionEntity[];
export type NotificationCollection = NotificationEntity[];

// ===============================
// === MAINTAIN IN ONE PLACE!   ===
// ===============================

/**
 * Only ever reference ID and value types from this file in your
 * repository interfaces, services, and application logic.
 * This ensures all changes are instantly reflected across your app.
 */
