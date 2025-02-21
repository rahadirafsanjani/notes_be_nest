import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/database.sqlite', // Path to your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
      synchronize: false, // Always false when using migrations
      logging: true, // Enable logging for debugging
      migrationsTableName: 'typeorm_migrations', // Name of the migrations table
      migrationsRun: false, // Disable auto-running migrations
    }),
    UsersModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
