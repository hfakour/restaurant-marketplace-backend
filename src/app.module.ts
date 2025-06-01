import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import configuration from './config/configuration';
import mikroOrmConfig from '../mikro-orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mikroOrmConfig,
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      playground: true, // ✅ Enables GraphQL Playground at /graphql
      installSubscriptionHandlers: true, // For future WebSocket support
    }),
  ],
})
export class AppModule {}
