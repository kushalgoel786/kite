import { Router } from "express";
const router = Router();

import { getHistoricalData } from "../controllers/historicalDataController.js";

import { validateQueryInput } from "../middlewares/validationMiddleware.js";

router.route("/").get(validateQueryInput, getHistoricalData);

export default router;
