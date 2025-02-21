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
      database: './src/database/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
    }),
    UsersModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
