import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovieByIdOrSlug,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createMovie);
router.get("/", getAllMovies);
router.get("/:idOrSlug", getMovieByIdOrSlug);
router.put("/:id", protect, authorize("admin"), updateMovie);
router.delete("/:id", protect, authorize("admin"), deleteMovie);

export default router;
