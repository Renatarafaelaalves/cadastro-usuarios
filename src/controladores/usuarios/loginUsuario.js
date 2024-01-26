const knex = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hash = process.env.JWT_HASH;

const loginDeUsuarios = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .satatus(404)
      .json({ mensagem: "Todos os campos devem ser preenchidos" });
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res
        .status(404)
        .json({ mensagem: "Usuario com E-mail fornecido , não encontrado! " });
    }

    const validarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!validarSenha) {
      return res.status(400).json({ mensagem: "Senha ou E-mail invalido." });
    }

    const token = jwt.sign({ id: usuario.id }, hash, { expiresIn: "8h" });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

module.exports = loginDeUsuarios;
