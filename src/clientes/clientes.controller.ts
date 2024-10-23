import { Controller, Get, Render, Param } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; 

@Controller('clientes')
export class ClientesController {
  constructor(private readonly databaseService: DatabaseService) {} 

  @Get()
  @Render("clientes")
  async findAllClientes() {
    const clientes = await this.databaseService.query('SELECT * FROM clientes ORDER BY nome');
    return {clientes};
  }

  @Get(':id')
  @Render("cliente")
  async findClienteById(@Param('id') id: string) {
    
    const results = await this.databaseService.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', [id]) as unknown[];
    return { cliente: results[0] }
  }
}