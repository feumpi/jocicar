import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Render('veiculos')
  async findAllVeiculos() {
    const veiculos = await this.databaseService.query(
      'SELECT * FROM veiculos ORDER BY id',
    );
    return { veiculos };
  }

  @Get(':id')
  @Render('veiculo')
  async findVeiculoById(@Param('id') id: string) {
    const veiculos = (await this.databaseService.query(
      'SELECT * FROM veiculos WHERE id = ?',
      [id],
    )) as unknown[];
    return { veiculo: veiculos[0] };
  }

  @Post()
  @Redirect('/veiculos')
  async criarVeiculo(
    @Body()
    veiculoData: {
      placa: string;
      fabricante: string;
      modelo: string;
      anoFabricacao: number;
      anoModelo: number;
      cor: string;
    },
  ) {
    const { placa, fabricante, modelo, anoFabricacao, anoModelo, cor } =
      veiculoData;

    const result = await this.databaseService.query(
      'INSERT INTO veiculos (placa, fabricante, modelo, ano_fabricacao, ano_modelo, cor) VALUES (?, ?, ?, ?, ?, ?)',
      [placa, fabricante, modelo, anoFabricacao, anoModelo, cor],
    );

    return { message: 'Veiculo criado com sucesso', result };
  }

  @Post('remover')
  @Redirect('/veiculos')
  async removerVeiculo(
    @Body()
    veiculoData: {
      id: number;
    },
  ) {
    const { id } = veiculoData;
    const result = await this.databaseService.query(
      'DELETE FROM veiculos WHERE id = ?',
      [id],
    );

    return { message: 'Veiculo removido com sucesso', result };
  }

  @Post('editar')
  @Redirect('/veiculos')
  async editarVeiculo(
    @Body()
    veiculoData: {
      id: number;
      placa: string;
      fabricante: string;
      modelo: string;
      anoFabricacao: number;
      anoModelo: number;
      cor: string;
    },
  ) {
    const { id, placa, fabricante, modelo, anoFabricacao, anoModelo, cor } =
      veiculoData;

    const result = await this.databaseService.query(
      'UPDATE veiculos SET placa = ?, fabricante = ?, modelo = ?, ano_fabricacao = ?, ano_modelo = ?, cor = ? WHERE id = ?',
      [placa, fabricante, modelo, anoFabricacao, anoModelo, cor, id],
    );

    return { message: 'Veiculo editado com sucesso', result };
  }
}
