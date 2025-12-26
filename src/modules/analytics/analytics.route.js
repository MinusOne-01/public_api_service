import { Router } from "express";
import { getAnalyticsSummary } from "./analytics.service";

const router = Router();

router.get("/analytics", getAnalyticsSummary);