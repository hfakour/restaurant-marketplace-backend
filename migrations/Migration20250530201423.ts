import { Migration } from '@mikro-orm/migrations';

export class Migration20250530201423 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "menu_category_entity" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) null, "icon_url" varchar(255) null, "display_order" int null, "is_active" boolean not null default true, constraint "menu_category_entity_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "menu_category_entity" add constraint "menu_category_entity_name_unique" unique ("name");`,
    );

    this.addSql(
      `create table "restaurant_category_entity" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) null, "image_url" varchar(255) null, "is_active" boolean not null default true, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "restaurant_category_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "restaurant" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) not null, "restaurant_category_id" varchar(255) not null, "chef" varchar(255) not null, "chef_image" varchar(255) not null, "delivery_time" varchar(255) not null, "logo" varchar(255) not null, "image" varchar(255) not null, "gallery" text[] not null, "open_time" varchar(255) not null, "close_time" varchar(255) not null, "is_open" boolean not null, "tags" text[] not null, "is_active" boolean not null default true, constraint "restaurant_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "menu_entity" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) null, "is_active" boolean not null default true, "average_rating" real null, "is_highlighted" boolean null default false, "highlight_reason" varchar(255) null, "restaurant_id" varchar(255) not null, "created_at" date not null, "updated_at" date not null, constraint "menu_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "food" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) not null, "ingredients" text[] not null, "allergies" text[] not null, "tags" text[] not null, "base_price" int not null, "image_url" varchar(255) not null, "is_available" boolean not null, "preparation_time" varchar(255) not null, "discount" int null, "menu_id" varchar(255) not null, "extras" jsonb not null, "customizations" jsonb not null, "sizes" jsonb not null, "restaurant_id" varchar(255) not null, "menu_category_id" varchar(255) not null, "created_at" date not null, "updated_at" date not null, constraint "food_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "coupon_entity" ("id" varchar(255) not null, "code" varchar(255) not null, "description" varchar(255) not null, "type" varchar(255) not null, "amount" int not null, "min_order_total" int null, "start_date" date not null, "end_date" date not null, "max_uses" int not null, "max_uses_per_user" int not null, "is_active" boolean not null default true, "restaurant_id" varchar(255) not null, "created_at" date not null, "updated_at" date not null, constraint "coupon_entity_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "coupon_entity" add constraint "coupon_entity_code_unique" unique ("code");`,
    );

    this.addSql(
      `create table "coupon_entity_applicable_restaurants" ("coupon_entity_id" varchar(255) not null, "restaurant_id" varchar(255) not null, constraint "coupon_entity_applicable_restaurants_pkey" primary key ("coupon_entity_id", "restaurant_id"));`,
    );

    this.addSql(
      `create table "admin" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in ('ROOT', 'RESTAURANT')) not null, "restaurant_id" varchar(255) null, "created_at" date not null, "updated_at" date not null, constraint "admin_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "audit_log" ("id" varchar(255) not null, "admin_id" varchar(255) not null, "action" varchar(255) not null, "target" varchar(255) not null, "details" jsonb not null, "created_at" date not null, constraint "audit_log_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "table" ("id" varchar(255) not null, "name" varchar(255) not null, "seats" int not null, "price_per_hour" int not null, "restaurant_id" varchar(255) not null, "is_available" boolean not null default true, constraint "table_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in ('customer', 'delivery', 'admin')) not null, "full_name" varchar(255) null, "phone" varchar(255) null, "image_url" varchar(255) null, "created_at" date not null, "updated_at" date not null, constraint "user_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(
      `create table "support_message_entity" ("id" varchar(255) not null, "content" varchar(255) not null, "type" varchar(255) not null, "sender_user_id" varchar(255) not null, "receiver_user_id" varchar(255) null, "subject" varchar(255) null, "reply_to_message_id" varchar(255) null, "is_read" boolean not null default false, "is_from_admin" boolean not null default false, "restaurant_id" varchar(255) null, "created_at" date not null, "updated_at" date not null, constraint "support_message_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "review_entity" ("id" varchar(255) not null, "comment" varchar(255) not null, "star_rating" int not null, "likes" int not null default 0, "dislikes" int not null default 0, "restaurant_id" varchar(255) null, "food_id" varchar(255) null, "user_id" varchar(255) not null, "created_at" date not null, "updated_at" date not null, constraint "review_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "reservation_entity" ("id" varchar(255) not null, "table_id" varchar(255) not null, "restaurant_id" varchar(255) not null, "user_id" varchar(255) not null, "time" timestamptz not null, "delay_in_minutes" int null, "table_name_at_booking" varchar(255) not null, "seats_at_booking" int not null, "price_at_booking" int not null, "duration_in_hours" int not null, "total_price" int not null, constraint "reservation_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "notification" ("id" varchar(255) not null, "title" varchar(255) not null, "body" varchar(255) not null, "image_url" varchar(255) null, "type" text check ("type" in ('ORDER', 'RESERVATION', 'PROMOTION', 'GENERAL')) not null, "deeplink" varchar(255) null, "target_user_id" varchar(255) null, "target_restaurant_id" varchar(255) null, "support_message_id" varchar(255) null, "is_read" boolean not null default false, "sent_at" date not null, "read_at" date null, constraint "notification_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "favorite_entity" ("id" varchar(255) not null, "user_id" varchar(255) not null, "food_id" varchar(255) null, "restaurant_id" varchar(255) null, "note" varchar(255) null, "created_at" date not null, constraint "favorite_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "auth_session" ("id" varchar(255) not null, "token" varchar(255) not null, "refresh_token" varchar(255) not null, "expires_in" int not null, "device_id" varchar(255) not null, "ip_address" varchar(255) not null, "user_agent" varchar(255) not null, "login_at" date not null, "is_revoked" boolean not null default false, "user_id" varchar(255) not null, constraint "auth_session_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "address" ("id" varchar(255) not null, "user_id" varchar(255) null, "restaurant_id" varchar(255) null, "title" varchar(255) not null, "street" varchar(255) not null, "city" varchar(255) not null, "postal_code" varchar(255) not null, "country" varchar(255) not null, "latitude" int not null, "longitude" int not null, "created_at" date not null, "updated_at" date not null, constraint "address_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "address" add constraint "address_restaurant_id_unique" unique ("restaurant_id");`,
    );

    this.addSql(
      `create table "order_entity" ("id" varchar(255) not null, "user_id" varchar(255) not null, "restaurant_id" varchar(255) not null, "delivery_address_id" varchar(255) not null, "subtotal" int not null, "tax" int not null, "delivery_fee" int not null, "total" int not null, "status" text check ("status" in ('PENDING', 'ACCEPTED', 'PREPARING', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED')) not null default 'PENDING', "notes" varchar(255) null, "payment_method" varchar(255) not null, "is_paid" boolean not null default false, "coupon_id" varchar(255) null, "created_at" date not null, "updated_at" date not null, constraint "order_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "payment_entity" ("id" varchar(255) not null, "order_id" varchar(255) not null, "amount" int not null, "method" text check ("method" in ('CARD', 'CASH', 'WALLET')) not null, "status" text check ("status" in ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')) not null default 'PENDING', "payment_gateway" varchar(255) null, "provider_transaction_id" varchar(255) null, "error_message" varchar(255) null, "created_at" date not null, "paid_at" date null, "refunded_at" date null, constraint "payment_entity_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "payment_entity" add constraint "payment_entity_order_id_unique" unique ("order_id");`,
    );

    this.addSql(
      `create table "order_item_entity" ("id" varchar(255) not null, "order_id" varchar(255) not null, "food_id" varchar(255) not null, "quantity" int not null, "unit_price" int not null, "total_price" int not null, "selected_extras" jsonb null, "selected_customizations" jsonb null, "selected_size" jsonb null, "created_at" date not null, "updated_at" date not null, constraint "order_item_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "wishlist_entity" ("id" varchar(255) not null, "user_id" varchar(255) not null, "title" varchar(255) null, "created_at" date not null, "updated_at" date not null, constraint "wishlist_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "wishlist_entity_restaurants" ("wishlist_entity_id" varchar(255) not null, "restaurant_id" varchar(255) not null, constraint "wishlist_entity_restaurants_pkey" primary key ("wishlist_entity_id", "restaurant_id"));`,
    );

    this.addSql(
      `create table "wishlist_entity_foods" ("wishlist_entity_id" varchar(255) not null, "food_id" varchar(255) not null, constraint "wishlist_entity_foods_pkey" primary key ("wishlist_entity_id", "food_id"));`,
    );

    this.addSql(
      `alter table "restaurant" add constraint "restaurant_restaurant_category_id_foreign" foreign key ("restaurant_category_id") references "restaurant_category_entity" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "menu_entity" add constraint "menu_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "food" add constraint "food_menu_id_foreign" foreign key ("menu_id") references "menu_entity" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "food" add constraint "food_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "food" add constraint "food_menu_category_id_foreign" foreign key ("menu_category_id") references "menu_category_entity" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "coupon_entity" add constraint "coupon_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "coupon_entity_applicable_restaurants" add constraint "coupon_entity_applicable_restaurants_coupon_entity_id_foreign" foreign key ("coupon_entity_id") references "coupon_entity" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "coupon_entity_applicable_restaurants" add constraint "coupon_entity_applicable_restaurants_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "admin" add constraint "admin_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "audit_log" add constraint "audit_log_admin_id_foreign" foreign key ("admin_id") references "admin" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "table" add constraint "table_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "support_message_entity" add constraint "support_message_entity_sender_user_id_foreign" foreign key ("sender_user_id") references "user" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "support_message_entity" add constraint "support_message_entity_receiver_user_id_foreign" foreign key ("receiver_user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "support_message_entity" add constraint "support_message_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "review_entity" add constraint "review_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "review_entity" add constraint "review_entity_food_id_foreign" foreign key ("food_id") references "food" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "review_entity" add constraint "review_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "reservation_entity" add constraint "reservation_entity_table_id_foreign" foreign key ("table_id") references "table" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "reservation_entity" add constraint "reservation_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "reservation_entity" add constraint "reservation_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "notification" add constraint "notification_target_user_id_foreign" foreign key ("target_user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification" add constraint "notification_target_restaurant_id_foreign" foreign key ("target_restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification" add constraint "notification_support_message_id_foreign" foreign key ("support_message_id") references "support_message_entity" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "favorite_entity" add constraint "favorite_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "favorite_entity" add constraint "favorite_entity_food_id_foreign" foreign key ("food_id") references "food" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "favorite_entity" add constraint "favorite_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "auth_session" add constraint "auth_session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "address" add constraint "address_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "address" add constraint "address_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "order_entity" add constraint "order_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order_entity" add constraint "order_entity_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order_entity" add constraint "order_entity_delivery_address_id_foreign" foreign key ("delivery_address_id") references "address" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order_entity" add constraint "order_entity_coupon_id_foreign" foreign key ("coupon_id") references "coupon_entity" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "payment_entity" add constraint "payment_entity_order_id_foreign" foreign key ("order_id") references "order_entity" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "order_item_entity" add constraint "order_item_entity_order_id_foreign" foreign key ("order_id") references "order_entity" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order_item_entity" add constraint "order_item_entity_food_id_foreign" foreign key ("food_id") references "food" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "wishlist_entity" add constraint "wishlist_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "wishlist_entity_restaurants" add constraint "wishlist_entity_restaurants_wishlist_entity_id_foreign" foreign key ("wishlist_entity_id") references "wishlist_entity" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "wishlist_entity_restaurants" add constraint "wishlist_entity_restaurants_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "wishlist_entity_foods" add constraint "wishlist_entity_foods_wishlist_entity_id_foreign" foreign key ("wishlist_entity_id") references "wishlist_entity" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "wishlist_entity_foods" add constraint "wishlist_entity_foods_food_id_foreign" foreign key ("food_id") references "food" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "food" drop constraint "food_menu_category_id_foreign";`);

    this.addSql(
      `alter table "restaurant" drop constraint "restaurant_restaurant_category_id_foreign";`,
    );

    this.addSql(`alter table "menu_entity" drop constraint "menu_entity_restaurant_id_foreign";`);

    this.addSql(`alter table "food" drop constraint "food_restaurant_id_foreign";`);

    this.addSql(
      `alter table "coupon_entity" drop constraint "coupon_entity_restaurant_id_foreign";`,
    );

    this.addSql(
      `alter table "coupon_entity_applicable_restaurants" drop constraint "coupon_entity_applicable_restaurants_restaurant_id_foreign";`,
    );

    this.addSql(`alter table "admin" drop constraint "admin_restaurant_id_foreign";`);

    this.addSql(`alter table "table" drop constraint "table_restaurant_id_foreign";`);

    this.addSql(
      `alter table "support_message_entity" drop constraint "support_message_entity_restaurant_id_foreign";`,
    );

    this.addSql(
      `alter table "review_entity" drop constraint "review_entity_restaurant_id_foreign";`,
    );

    this.addSql(
      `alter table "reservation_entity" drop constraint "reservation_entity_restaurant_id_foreign";`,
    );

    this.addSql(
      `alter table "notification" drop constraint "notification_target_restaurant_id_foreign";`,
    );

    this.addSql(
      `alter table "favorite_entity" drop constraint "favorite_entity_restaurant_id_foreign";`,
    );

    this.addSql(`alter table "address" drop constraint "address_restaurant_id_foreign";`);

    this.addSql(`alter table "order_entity" drop constraint "order_entity_restaurant_id_foreign";`);

    this.addSql(
      `alter table "wishlist_entity_restaurants" drop constraint "wishlist_entity_restaurants_restaurant_id_foreign";`,
    );

    this.addSql(`alter table "food" drop constraint "food_menu_id_foreign";`);

    this.addSql(`alter table "review_entity" drop constraint "review_entity_food_id_foreign";`);

    this.addSql(`alter table "favorite_entity" drop constraint "favorite_entity_food_id_foreign";`);

    this.addSql(
      `alter table "order_item_entity" drop constraint "order_item_entity_food_id_foreign";`,
    );

    this.addSql(
      `alter table "wishlist_entity_foods" drop constraint "wishlist_entity_foods_food_id_foreign";`,
    );

    this.addSql(
      `alter table "coupon_entity_applicable_restaurants" drop constraint "coupon_entity_applicable_restaurants_coupon_entity_id_foreign";`,
    );

    this.addSql(`alter table "order_entity" drop constraint "order_entity_coupon_id_foreign";`);

    this.addSql(`alter table "audit_log" drop constraint "audit_log_admin_id_foreign";`);

    this.addSql(
      `alter table "reservation_entity" drop constraint "reservation_entity_table_id_foreign";`,
    );

    this.addSql(
      `alter table "support_message_entity" drop constraint "support_message_entity_sender_user_id_foreign";`,
    );

    this.addSql(
      `alter table "support_message_entity" drop constraint "support_message_entity_receiver_user_id_foreign";`,
    );

    this.addSql(`alter table "review_entity" drop constraint "review_entity_user_id_foreign";`);

    this.addSql(
      `alter table "reservation_entity" drop constraint "reservation_entity_user_id_foreign";`,
    );

    this.addSql(
      `alter table "notification" drop constraint "notification_target_user_id_foreign";`,
    );

    this.addSql(`alter table "favorite_entity" drop constraint "favorite_entity_user_id_foreign";`);

    this.addSql(`alter table "auth_session" drop constraint "auth_session_user_id_foreign";`);

    this.addSql(`alter table "address" drop constraint "address_user_id_foreign";`);

    this.addSql(`alter table "order_entity" drop constraint "order_entity_user_id_foreign";`);

    this.addSql(`alter table "wishlist_entity" drop constraint "wishlist_entity_user_id_foreign";`);

    this.addSql(
      `alter table "notification" drop constraint "notification_support_message_id_foreign";`,
    );

    this.addSql(
      `alter table "order_entity" drop constraint "order_entity_delivery_address_id_foreign";`,
    );

    this.addSql(`alter table "payment_entity" drop constraint "payment_entity_order_id_foreign";`);

    this.addSql(
      `alter table "order_item_entity" drop constraint "order_item_entity_order_id_foreign";`,
    );

    this.addSql(
      `alter table "wishlist_entity_restaurants" drop constraint "wishlist_entity_restaurants_wishlist_entity_id_foreign";`,
    );

    this.addSql(
      `alter table "wishlist_entity_foods" drop constraint "wishlist_entity_foods_wishlist_entity_id_foreign";`,
    );

    this.addSql(`drop table if exists "menu_category_entity" cascade;`);

    this.addSql(`drop table if exists "restaurant_category_entity" cascade;`);

    this.addSql(`drop table if exists "restaurant" cascade;`);

    this.addSql(`drop table if exists "menu_entity" cascade;`);

    this.addSql(`drop table if exists "food" cascade;`);

    this.addSql(`drop table if exists "coupon_entity" cascade;`);

    this.addSql(`drop table if exists "coupon_entity_applicable_restaurants" cascade;`);

    this.addSql(`drop table if exists "admin" cascade;`);

    this.addSql(`drop table if exists "audit_log" cascade;`);

    this.addSql(`drop table if exists "table" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "support_message_entity" cascade;`);

    this.addSql(`drop table if exists "review_entity" cascade;`);

    this.addSql(`drop table if exists "reservation_entity" cascade;`);

    this.addSql(`drop table if exists "notification" cascade;`);

    this.addSql(`drop table if exists "favorite_entity" cascade;`);

    this.addSql(`drop table if exists "auth_session" cascade;`);

    this.addSql(`drop table if exists "address" cascade;`);

    this.addSql(`drop table if exists "order_entity" cascade;`);

    this.addSql(`drop table if exists "payment_entity" cascade;`);

    this.addSql(`drop table if exists "order_item_entity" cascade;`);

    this.addSql(`drop table if exists "wishlist_entity" cascade;`);

    this.addSql(`drop table if exists "wishlist_entity_restaurants" cascade;`);

    this.addSql(`drop table if exists "wishlist_entity_foods" cascade;`);
  }
}
