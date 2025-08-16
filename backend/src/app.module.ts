import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 1. Importar
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 2. Carregar as variáveis de ambiente
    TypeOrmModule.forRoot({
      type: 'postgres',
      // 3. Usa a URL do banco de dados da Render (se existir)
      url: process.env.DATABASE_URL,
      // 4. Configuração SSL obrigatória para a Render
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true, // Manteremos true para facilitar o deploy inicial
    }),
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}