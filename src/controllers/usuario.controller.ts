import { Request, Response } from "express";
import pool from "../db/connection";

export const addUsuario = (req: Request, res: Response) => {
  const { nombre, password } = req.body;

  pool
    .query("INSERT INTO usuarios (nombre, password) VALUES (?, ?)", [
      nombre,
      password,
    ])
    .then((result) => {
      res.status(201).json({ msg: "Usuario creado" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error creando usuario" });
    });
};
