import { Request, Response } from "express";
import connection from "../db/connection";

export const getProductos = (req: Request, res: Response) => {
  connection
    .query("SELECT * FROM productos")
    .then((rows) => {
      res.status(200).json({ data: rows });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching products" });
    });
};
