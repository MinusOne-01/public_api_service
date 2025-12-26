import { Router } from "express";
import requestKey from "./apiKey.controller";

const router = Router();

router.get("/getkey", requestKey);