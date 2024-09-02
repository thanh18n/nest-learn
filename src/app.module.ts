import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule
  ],
})

export class AppModule {}
