import { Router } from "express";
import { getProductos } from "../controllers/producto.controller";
import validateToken from "./validate-token";

const router = Router();

router.get("/", validateToken, getProductos);

export default router;
