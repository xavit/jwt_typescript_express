import { Router } from "express";
import { getDefaults } from "../controllers/default.controller";

const router = Router();

router.get("/", getDefaults);

export default router;
