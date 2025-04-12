import express from "express";
import {
  createLanguage,
  getAllLanguages,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllLanguages);

router.post("/", protect, authorize("admin"), createLanguage);
router.put("/:id", protect, authorize("admin"), updateLanguage);
router.delete("/:id", protect, authorize("admin"), deleteLanguage);

export default router;

