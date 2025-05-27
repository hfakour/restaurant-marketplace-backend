const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');
const { PostgreSqlDriver } = require('@mikro-orm/postgresql');
const { Migrator } = require('@mikro-orm/migrations'); // 👈 add this line
require('dotenv').config();

module.exports = {
  driver: PostgreSqlDriver,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  entities: ['./dist/domain/**/*.entity.js'],
  entitiesTs: ['./src/domain/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    glob: '!(*.d).{ts,js}',
  },
  extensions: [Migrator], // 👈 register extension here
  debug: process.env.NODE_ENV !== 'production',
};
