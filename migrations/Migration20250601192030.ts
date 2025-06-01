import { Migration } from '@mikro-orm/migrations';

export class Migration20250601192030 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "notification_entity" ("id" varchar(255) not null, "title" varchar(255) not null, "body" varchar(255) not null, "image_url" varchar(255) null, "type" text check ("type" in ('ORDER', 'RESERVATION', 'PROMOTION', 'GENERAL')) not null, "deeplink" varchar(255) null, "target_user_id" varchar(255) null, "target_restaurant_id" varchar(255) null, "support_message_id" varchar(255) null, "is_read" boolean not null default false, "sent_at" date not null, "read_at" date null, constraint "notification_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "notification_entity" add constraint "notification_entity_target_user_id_foreign" foreign key ("target_user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification_entity" add constraint "notification_entity_target_restaurant_id_foreign" foreign key ("target_restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification_entity" add constraint "notification_entity_support_message_id_foreign" foreign key ("support_message_id") references "support_message_entity" ("id") on update cascade on delete set null;`,
    );

    this.addSql(`drop table if exists "notification" cascade;`);

    this.addSql(
      `alter table "admin" add column "full_name" varchar(255) null, add column "phone" varchar(255) null, add column "image_url" varchar(255) null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "notification" ("id" varchar(255) not null, "title" varchar(255) not null, "body" varchar(255) not null, "image_url" varchar(255) null, "type" text check ("type" in ('ORDER', 'RESERVATION', 'PROMOTION', 'GENERAL')) not null, "deeplink" varchar(255) null, "target_user_id" varchar(255) null, "target_restaurant_id" varchar(255) null, "support_message_id" varchar(255) null, "is_read" bool not null default false, "sent_at" date not null, "read_at" date null, constraint "notification_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "notification" add constraint "notification_support_message_id_foreign" foreign key ("support_message_id") references "support_message_entity" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification" add constraint "notification_target_restaurant_id_foreign" foreign key ("target_restaurant_id") references "restaurant" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "notification" add constraint "notification_target_user_id_foreign" foreign key ("target_user_id") references "user" ("id") on update cascade on delete set null;`,
    );

    this.addSql(`drop table if exists "notification_entity" cascade;`);

    this.addSql(
      `alter table "admin" drop column "full_name", drop column "phone", drop column "image_url";`,
    );
  }
}
