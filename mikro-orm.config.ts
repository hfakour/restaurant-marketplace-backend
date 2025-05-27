import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from 'src/domain/user/entities/user.entity';

const isProduction = process.env.NODE_ENV === 'production';

const mikroOrmConfig = (config: ConfigService): MikroOrmModuleSyncOptions => ({
  entities: isProduction ? ['./dist/domain/**/*.entity.js'] : [User], // or 'src/domain/**/*.entity.ts',
  dbName: config.get<string>('postgres.db'),
  user: config.get<string>('postgres.user'),
  password: config.get<string>('postgres.password'),
  host: config.get<string>('postgres.host'),
  port: config.get<number>('postgres.port'),
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: config.get<string>('nodeEnv') !== 'production',
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    glob: '!(*.d).{ts,js}',
  },
});

export default mikroOrmConfig;
