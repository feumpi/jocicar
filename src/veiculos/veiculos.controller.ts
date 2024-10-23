import { Controller, Get, Render, Param } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; 

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Render("veiculos")
  async findAllVeiculos() {
    const veiculos = await this.databaseService.query('SELECT * FROM veiculos ORDER BY id');
    return {veiculos};
  }

  @Get(':id')
  @Render("veiculo")
  async findVeiculoById(@Param('id') id: string) {
    
    const veiculos = await this.databaseService.query('SELECT * FROM veiculos WHERE id = ?', [id]) as unknown[];
    return { veiculo: veiculos[0] }
  }
}
