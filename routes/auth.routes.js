import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Optional — can remove in prod

export default router;

