import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Each language should be unique
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Language code like "en", "fr", etc.
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Language", languageSchema);

