import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; 

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async findAllVeiculos() {
    const veiculos = await this.databaseService.query('SELECT * FROM veiculos');
    return veiculos;
  }
}
