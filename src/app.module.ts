import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ClientesController } from './clientes/clientes.controller';
import { VeiculosController } from './veiculos/veiculos.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController, VeiculosController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
