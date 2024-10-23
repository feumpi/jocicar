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

@Controller('clientes')
export class ClientesController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Render('clientes')
  async findAllClientes() {
    const clientes = await this.databaseService.query(
      'SELECT * FROM clientes ORDER BY nome',
    );
    return { clientes };
  }

  @Get(':id')
  @Render('cliente')
  async findClienteById(@Param('id') id: string) {
    const results = (await this.databaseService.query(
      'SELECT * FROM clientes WHERE id = ? LIMIT 1',
      [id],
    )) as unknown[];
    return { cliente: results[0] };
  }

  @Post()
  @Redirect('/clientes')
  async criarCliente(
    @Body()
    clienteData: {
      nome: string;
      cpf: string;
      cnh: string;
      telefone: string;
      email: string;
      endereco: string;
    },
  ) {
    const { nome, cpf, cnh, telefone, email, endereco } = clienteData;
    const result = await this.databaseService.query(
      'INSERT INTO clientes (nome, cpf, cnh, telefone, email, endereco) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, cpf, cnh, telefone, email, endereco],
    );

    return { message: 'Cliente criado com sucesso', result };
  }

  @Post('remover')
  @Redirect('/clientes')
  async removerCliente(
    @Body()
    clienteData: {
      id: string;
    },
  ) {
    const { id } = clienteData;
    const result = await this.databaseService.query(
      'DELETE FROM clientes WHERE id = ?',
      [id],
    );

    return { message: 'Cliente removido com sucesso', result };
  }

  @Post('editar')
  @Redirect('/clientes')
  async editarCliente(
    @Body()
    clienteData: {
      id: string;
      nome: string;
      cpf: string;
      cnh: string;
      telefone: string;
      email: string;
      endereco: string;
    },
  ) {
    const { id, nome, cpf, cnh, telefone, email, endereco } = clienteData;
    const result = await this.databaseService.query(
      'UPDATE clientes SET nome = ?, cpf = ?, cnh = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?',
      [nome, cpf, cnh, telefone, email, endereco, id],
    );

    return { message: 'Cliente editado com sucesso', result };
  }
}
