import asyncHandeler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Adjust path as needed
import { ApiError } from "../utils/ApiError.js";
export const verifyJWT = asyncHandeler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select("-password");

  next();
});
