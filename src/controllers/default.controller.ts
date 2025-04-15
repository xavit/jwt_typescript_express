import { Request, Response } from "express";

export const getDefaults = (req: Request, res: Response) => {
  res.status(200).json({ msg: "API Funcionando" });
};
