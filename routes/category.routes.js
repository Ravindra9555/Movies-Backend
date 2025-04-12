import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryByIdOrSlug,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin routes
router.post("/", protect, authorize("admin"), createCategory);
router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

// Public routes
router.get("/", getAllCategories);
router.get("/:idOrSlug", getCategoryByIdOrSlug);

export default router;
