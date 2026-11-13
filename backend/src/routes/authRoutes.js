import express from "express";
import { body } from "express-validator";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters"),
  ],
  validateRequest,
  registerUser,
);

// Login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginUser,
);

// Current user
router.get("/me", protect, getMe);

export default router;
