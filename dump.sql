create table if not exists usuarios (
    id serial PRIMARY KEY,
    nome text not null,
    email text unique not null,
    senha text not null
);

create table if not exists categorias (
    id serial PRIMARY KEY, 
    descricao text unique not null
    );


create table if not exists transacoes (
    id serial primary key,
    descricao text not null,
    valor numeric (10,2) not null,
    data timestamp not null,
    categoria_id integer not null references categorias(id),
    usuario_id integer not null references usuarios(id),
    tipo text
);

insert into categorias (descricao) 
values 
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');