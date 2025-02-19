import { DataSource } from 'typeorm';
import { join } from 'path';

export const connectionSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, '../../database/database.sqlite'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'], // Path to your entities
  migrations: [join(__dirname, '../../database/migrations/**/*{.ts,.js}')], // Path to your migrations
  synchronize: false, // Always false when using migrations
  logging: true, // Enable logging for debugging
  migrationsTableName: 'typeorm_migrations', // Name of the migrations table
});
