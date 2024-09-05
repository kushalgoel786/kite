import { Router } from "express";

import {
  login,
  logout,
  register,
  getCurrentUser,
} from "../controllers/userController.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

router.get("/profile", authenticateUser, getCurrentUser);

export default router;
