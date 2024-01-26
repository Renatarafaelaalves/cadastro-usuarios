const express = require("express");
const loginDeUsuarios = require("./controladores/usuarios/loginUsuario");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const rotas = express.Router();

rotas.post("/usuario", cadastrarUsuario );
rotas.post("/login", loginDeUsuarios);

module.exports = rotas;
