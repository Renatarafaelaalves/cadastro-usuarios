const knex = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarDadosDoUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  if (!nome && !email && !senha) {
    return res
      .status(400)
      .json({ mensagem: "Algum campo deve ser atualizado" });
  }

  try {
    const emailExiste = await knex("usuarios")
      .whereNot("id", id)
      .where("email", email);

    if (emailExiste.length > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuario cadastrado com o e-mail informado!",
      });
    }

    const usuarioExistente = await knex("usuarios").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const atualizandoUsuario = await knex("usuarios")
      .where("id", id)
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning("*");

    return res
      .status(200)
      .json({ mensagem: "Usuario atualizado com sucesso",
       atualizandoUsuario });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
};

module.exports = atualizarDadosDoUsuario;
