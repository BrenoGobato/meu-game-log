import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module'; // NestJS já deve ter adicionado isso

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '102307', // Sua senha real deve estar aqui
      database: 'postgres',
      autoLoadEntities: true, 
      synchronize: true,
    }),
    GamesModule, // O módulo de Games que criamos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}