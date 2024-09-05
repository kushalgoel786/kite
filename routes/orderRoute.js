import { Router } from "express";

import { placeOrder } from "../controllers/orderController.js";

import { validatePlaceOrderInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/place-order", validatePlaceOrderInput, placeOrder);

export default router;
