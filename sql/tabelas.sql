create table clientes
(
    id       int auto_increment
        primary key,
    nome     varchar(100)  not null,
    cpf      varchar(11)   not null,
    cnh      varchar(11)   not null,
    telefone varchar(11)   not null,
    email    varchar(100)  null,
    endereco varchar(1000) null
);

create table veiculos
(
    id             int auto_increment
        primary key,
    placa          varchar(7)           not null,
    fabricante     varchar(20)          not null,
    modelo         varchar(20)          not null,
    ano_modelo     int                  not null,
    ano_fabricacao int                  not null,
    cor            varchar(7)           not null,
    disponivel     tinyint(1) default 1 not null,
    imagem         varchar(1000)        null
);

create table alugueis
(
    id              int auto_increment
        primary key,
    id_cliente      int         not null,
    id_veiculo      int         not null,
    data_inicio     date        not null,
    data_fim        date        not null,
    forma_pagamento varchar(20) not null,
    constraint alugueis_clientes_id_fk
        foreign key (id_cliente) references clientes (id),
    constraint alugueis_veiculos_id_fk
        foreign key (id_veiculo) references veiculos (id)
);

