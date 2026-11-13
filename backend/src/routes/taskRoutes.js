import express from "express";
import { body } from "express-validator";

import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all tasks
router.get("/", getTasks);

// Create task
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Task title is required"),

    body("title")
      .isLength({ max: 150 })
      .withMessage("Task title cannot exceed 150 characters"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid task status"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid task priority"),

    body("dueDate")
      .optional({ values: "falsy" })
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  validateRequest,
  createTask,
);

// Update task
router.patch(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Task title cannot be empty"),

    body("title")
      .optional()
      .isLength({ max: 150 })
      .withMessage("Task title cannot exceed 150 characters"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid task status"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid task priority"),

    body("dueDate")
      .optional({ values: "falsy" })
      .isISO8601()
      .withMessage("Due date must be a valid date"),
  ],
  validateRequest,
  updateTask,
);

// Delete task
router.delete("/:id", deleteTask);

export default router;
