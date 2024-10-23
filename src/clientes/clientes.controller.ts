import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; 

@Controller('clientes')
export class ClientesController {
  constructor(private readonly databaseService: DatabaseService) {} 

  @Get()
  async findAllCleientes() {
    const clientes = await this.databaseService.query('SELECT * FROM clientes');
    return clientes;
  }
}