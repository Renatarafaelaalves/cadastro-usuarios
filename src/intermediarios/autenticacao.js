require("dotenv").config();
const jwt = require("jsonwebtoken");
const knex = require("../conexao");
const hash = process.env.JWT_HASH;

const autenticandoRotas = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        mensagem: "Um tokem valido deve ser enviado",
      });
    }

    const { id } = jwt.verify(token, hash);

    const usuario = await knex("usuarios").where({ id });

    req.usuario = usuario[0];

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensagem: "Token inválido ou expirado." });
  }
};

module.exports = autenticandoRotas;
