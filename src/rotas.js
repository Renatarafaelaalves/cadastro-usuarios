const express = require("express");
const loginDeUsuarios = require("./controladores/usuarios/loginUsuario");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const autenticandoRotas = require("./intermediarios/autenticacao");
const atualizarDadosDoUsuario = require("./controladores/usuarios/atualizarDadosUsuario");

const rotas = express.Router();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginDeUsuarios);

rotas.use(autenticandoRotas);

rotas.put("/usuario/:id", atualizarDadosDoUsuario);

module.exports = rotas;
