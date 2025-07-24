import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456?a',
  database: process.env.DB_NAME || 'dashboard-app',
  migrationsTransactionMode: 'each',
  entities: ['src/auth/**/*.entity.{js,ts}'], // Is correct for generate
  logging: false,
  synchronize: true,
  migrationsRun: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
});
