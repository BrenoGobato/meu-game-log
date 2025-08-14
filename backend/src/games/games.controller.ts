import { Body, Controller, Get, Param, Post } from '@nestjs/common'; // Adicionar Param
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  // NOSSO NOVO ENDPOINT PARA BUSCAR UM JOGO POR ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }
}