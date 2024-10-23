import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', 
      database: 'jocicar',
    });
    console.log('Banco de dados conectado com sucesso.');
  }

  async query(sql: string, params?: any[]) {
    const [results] = await this.connection.execute(sql, params);
    return results;
  }

  async onModuleDestroy() {
    // Close the connection when the module is destroyed
    if (this.connection) {
      await this.connection.end();
      console.log('Conexão encerrada com o banco de dados.');
    }
  }
}