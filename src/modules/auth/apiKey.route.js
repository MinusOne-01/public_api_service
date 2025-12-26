import { Router } from "express";
import requestKey from "./apiKey.controller.js";

const router = Router();

router.post("/getkey", requestKey);

export default router;