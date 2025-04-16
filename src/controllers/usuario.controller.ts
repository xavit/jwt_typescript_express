import { Request, Response } from "express";
import pool from "../db/connection";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const addUsuario = (req: Request, res: Response) => {
  const { body } = req;

  pool
    .query("INSERT INTO usuarios (nombre, password) VALUES (?, ?)", [
      body.nombre,
      bcrypt.hashSync(body.password, 10),
    ])
    .then((result) => {
      res.status(201).json({ msg: "Usuario creado" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error creando usuario" });
    });

  // pool
  //   .query("INSERT INTO usuarios (nombre, password) VALUES (?, ?)", body)
  //   .then((result) => {
  //     res.status(201).json({ msg: "Usuario creado" });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).json({ error: "Error creando usuario" });
  //   });
};

export const loginUser = (req: Request, res: Response) => {
  const { body } = req;
  console.log("body", body);

  pool
    .query("SELECT * FROM usuarios WHERE nombre = ?", [body.nombre])
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const user = result[0];

      if (!bcrypt.compareSync(body.password, user.password)) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
      const token = jwt.sign(
        { id: user.id, nombre: user.nombre },
        process.env.JWT_SECRET!
      );

      res.status(200).json({ msg: "Login exitoso", user, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error en el login" });
    });
};
