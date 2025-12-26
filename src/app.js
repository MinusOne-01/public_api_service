import express from "express";
import cors from "cors";
import keyRoutes from "./modules/auth/apiKey.route.js";
import analyticsRoutes from "./modules/analytics/analytics.route.js";
import { publicApiPipeline } from "./common/middleware/pipelines/publicApi.pipeline.js";
import convertRoutes from "./modules/convertPrice/convert.route.js";


const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/keys", keyRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/service", ...publicApiPipeline(), convertRoutes);

export default app;