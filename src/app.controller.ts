import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  @Render('index')
  async relatorio() {
    const result = (await this.databaseService.query(`
      SELECT 
        (SELECT COUNT(*) FROM clientes) AS clientes,
        (SELECT COUNT(*) FROM veiculos) AS veiculos,
        (SELECT COUNT(*) FROM alugueis) AS alugueis
    `)) as { clientes: number; veiculos: number; alugueis: number }[];

    return {
      clientes: result[0].clientes || 0,
      veiculos: result[0].veiculos || 0,
      alugueis: result[0].alugueis || 0,
    };
  }
}
