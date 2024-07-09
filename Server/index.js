/*const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

{/*Conexão Com o banco de dados *//*

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "banco",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

{/*Verificação de login*/

/*app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(response)
          
        } else {
          res.send({ msg: "email ou senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});


// Configs do CRUD
app.post("/insert", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  let SQL = "INSERT INTO items (name,cost) VALUES (?,?)"

    db.query(SQL,[name,cost], (err, result) => {
        console.log(err);
   }) 
});

app.get("/get", (req, res) => {
    let SQL = "SELECT * FROM items"

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.get("/getCards/:nome", (req,res) => {
  const nome = req.params.nome;
  let sql = `SELECT * FROM items WHERE name LIKE '${nome}%'`;
  db.query(sql, [nome],(err, result) => {
    if (err) {
      console.log(err);
    }else {
      res.send(result);
    }
  })
});

app.put("/edit", (req,res)=>{
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;

    let SQL = "UPDATE items SET name= ?, cost= ? WHERE iditems = ?";

    db.query(SQL, [name, cost, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });

});

app.delete("/delete/:id",(req,res)=>{
        const {id} = req.params;
        let SQL = "DELETE FROM items WHERE iditems = ?";
         
        db.query(SQL,[id],(err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
})


app.listen(3001, () => {
  console.log("rodando na porta 3001");
}); */

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "banco",
});

app.use(express.json());
app.use(cors());

// Registro de usuário
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.send(err);
        }
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (error) {
              res.send(error);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

// Verificação de login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(true);
        } else {
          res.send({ msg: "Email ou senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

// Obter todos os usuários
app.get("/usuarios", (req, res) => {
  const SQL = "SELECT * FROM usuarios";

  db.query(SQL, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Alterar usuário
app.put("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send(err);
    }

    const SQL = "UPDATE usuarios SET email = ?, password = ? WHERE id = ?";
    db.query(SQL, [email, hash, id], (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send({ success: true });
      }
    });
  });
});

// Excluir usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const SQL = "DELETE FROM usuarios WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ success: true });
    }
  });
});

// Rotas CRUD existentes
app.post("/insert", (req, res) => {
  const { name, cost } = req.body;
  const SQL = "INSERT INTO items (name, cost) VALUES (?, ?)";

  db.query(SQL, [name, cost], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get", (req, res) => {
  const SQL = "SELECT * FROM items";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getCards/:nome", (req, res) => {
  const nome = req.params.nome;
  const SQL = `SELECT * FROM items WHERE name LIKE '${nome}%'`;

  db.query(SQL, [nome], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id, name, cost } = req.body;
  const SQL = "UPDATE items SET name = ?, cost = ? WHERE iditems = ?";

  db.query(SQL, [name, cost, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM items WHERE iditems = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

