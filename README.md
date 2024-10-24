# JOCICAR

Sistema para locadora de veículos desenvolvido para a C2 de Banco de Dados

Professor: Howard Roatti
Alunos: Felipe Pereira Umpierre e Jocimar Rafael Pereira da Vitória

2024/2

## Ferramentas utilizadas
* JavaScript
* TypeScript
* Node.js
* NestJS
* Express
* MySQL


## Como executar no Linux
Com uma conexão `MySQL` ativa, crie um schema chamado `jocicar`. 

Configure o usuário e senha no arquivo `src/database/database.service.ts`.

Execute os scripts da pasta `sql` para criar as tabelas e inserir dados iniciais.

Instale o `Node.js`, se ainda não o tiver disponível

Instale as dependencias do projeto
```
npm install
```

Inicie o servidor
```
npm run start
```

Acesse o sistema em `http://localhost:3000`
