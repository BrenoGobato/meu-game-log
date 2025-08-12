import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity'; // 1. Importamos nossa entidade
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]), // 2. Registramos a entidade aqui
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}