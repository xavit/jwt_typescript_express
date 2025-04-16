import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ message: "Acceso denegado. Token no proporcionado." });
    }

    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
      throw new Error(
        "Clave secreta no configurada en las variables de entorno."
      );
    }

    const verified = jwt.verify(token!, secretKey);

    // console.log("Verified:", verified);
    // console.log("Token:", token);
    next(); // Call next() if validation succeeds
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" }); // Handle errors properly
  }
};

export default validateToken;
