import { Router } from "express";

import { getHoldings } from "../controllers/portfolioController.js";

const router = Router();

router.get("/holdings", getHoldings);

export default router;
