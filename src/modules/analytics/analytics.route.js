import { Router } from "express";
import { analyticsController } from "./analytics.controller.js";

const router = Router();

router.get("/allkeys", analyticsController);

export default router;