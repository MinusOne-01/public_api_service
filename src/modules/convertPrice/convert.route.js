import { Router } from "express";
import { convertController } from "./convert.controller.js";

const router = Router();

router.get("/price", convertController);

export default router;
