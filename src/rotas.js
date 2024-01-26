const express = require("express");
const cadastrarUsuario = require('./controladores/usuarios/cadastrarUsuario')
const rotas = express.Router();

rotas.post("/usuario", cadastrarUsuario.cadastrarUsuario);

module.exports = rotas;
