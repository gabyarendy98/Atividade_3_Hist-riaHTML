import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.status(200);
  res.send("Bem vindo ao app!");
});

//propriedades de um usuário
//nome, e-mail (deve ser único), senha e identificador único
const usuarios = [];
let identificadorUnicoUsuario = 0;

//deve receber um query com as propriedades pertencentes ao usuário
//criando um novo usuário
app.post("/usuarios", function (req, res) {
  const novoUsuario = {
    nome: req.query.nome,
    email: req.query.email,
    senha: req.query.senha,
    identificador: identificadorUnicoUsuario,
  };
  identificadorUnicoUsuario++;
  usuarios.push(novoUsuario);
  res.send("criar usuarios");
});

//logando um usuário
app.get("/login", function (req, res) {
  res.send("login");

});

//propriedades deu  um recado
// título, identificador e descrição

const recados = [];
let identificadorUnicoRecado = 0;
// crud de recados

//criando um recado
app.post("/recados", function (req, res) {
  res.send("criar recado");
});

//buscando um recado pelo id
app.get("/recados/:id", function (req, res) {
  res.send("listar recado");
});

//atualizando um recado
app.put("/recados/:id", function (req, res) {
  res.send("atualizando o recado");
});

//deletando um recado
app.delete("/recados/:id", function (req, res) {
  res.send("deletando o recado");
});

//VALIDAÇÕES

const queryInvalido =
  !req.query.nome || !req.query.email || !req.query.senha;

//SE O E-MAIL JÁ EXISTE
const existeEmail = usuarios.some(function (usuario) {
  return usuario.email === req.query.email;
});

if (queryInvalido) {
  res.send(400);
  res.send("Os dados informados são inválidos. Tente novamente");
} else if (existeEmail) {
  res.send(400);
  res.send("Esse e-mail já foi cadastrado. Por favor insira um novo e-mail");
} else {
  const novoUsuario = {
    nome: req.query.nome,
    email: req.query.email,
    senha: req.query.senha,
    identificador: identificadorUnicoUsuario,
  };
  identificadorUnicoUsuario++;
  usuarios.push(novoUsuario);
  res.send(200);
  res.json({
    mensagem: "Usuário cadastrado com sucesso",
    usuario: novoUsuario,
  });
} 
app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000: url http://localhost:3000");
});
