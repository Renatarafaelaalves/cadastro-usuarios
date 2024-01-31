const knex = require("../../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(404).json({
      mensagem: "Todos os campos devem ser preenchidos",
    });
  }

  try {
    const emailExiste = await knex("usuarios").where({ email }).first();

    if (emailExiste) {
      return res
        .status(400)
        .json({ mensagem: "Existe usuario cadastrado com E-mail informado!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning("*");

    return res.status(200).json({
      mensagem: "Usuario cadastrado com sucesso!",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro no servidor",
    });
  }
};

module.exports = cadastrarUsuario;
