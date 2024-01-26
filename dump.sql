create database cadastro_usuarios;

create table usuarios (
   id primary key;
   nome text not null;
   email text not null unique,
   senha text not null

);