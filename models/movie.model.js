import mongoose from "mongoose";

const downloadLinkSchema = new mongoose.Schema({
  label: {
    type: String, // e.g. "Telegram", "Google Drive"
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  quality: {
    type: String, // e.g. "720p"
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    year: {
      type: Number,
      index: true,
    },
    qualities: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    thumbnailUrl: {
      type: String, // Cloudinary or CDN URL
    },
    downloadLinks: [downloadLinkSchema],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text" });

export default mongoose.model("Movie", movieSchema);

