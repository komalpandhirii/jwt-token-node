const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "a sample api",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "Komal",
    email: "komal@gmail.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({
        result: "Invalid Token",
      });
      console.log(err);
    } else {
      res.json({
        message: "Data acessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeaders = req.headers["authorization"];

  if (typeof bearerHeaders !== "undefined") {
    const bearer = bearerHeaders.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is not Valid",
    });
  }
}

app.listen(5000, () => {
  console.log("Listening to PORT 5000");
});
