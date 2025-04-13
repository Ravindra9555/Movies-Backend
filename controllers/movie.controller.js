import Movie from "../models/movie.model.js";

  export const createMovie = async (req, res) => {
    try {
      const {
        title,
        slug,
        description,
        categoryId,
        languageId,
        year,
        qualities,
        tags,
        thumbnailUrl,
        downloadLinks,
      } = req.body;
  
      if (!title || !slug || !categoryId || !languageId || !year) {
        return res.status(400).json({ message: "Required fields are missing" });
      }
  
      const exists = await Movie.findOne({ slug });
      if (exists) {
        return res.status(400).json({ message: "Movie with this slug already exists" });
      }
  
      const movie = new Movie({
        title,
        slug,
        description,
        categoryId,
        languageId,
        year,
        qualities,
        tags,
        thumbnailUrl,
        downloadLinks,
      });
  
      const saved = await movie.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const getAllMovies = async (req, res) => {
    try {
      const { categoryId, languageId, year, search, page = 1, limit = 10 } = req.query;
  
      const filter = {};
  
      if (categoryId) filter.categoryId = categoryId;
      if (languageId) filter.languageId = languageId;
      if (year) filter.year = year;
      if (search) {
        filter.$text = { $search: search };
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const movies = await Movie.find(filter)
        .populate("categoryId", "name")
        .populate("languageId", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
  
      const total = await Movie.countDocuments(filter);
  
      res.json({
        data: movies,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  export const getMovieByIdOrSlug = async (req, res) => {
    try {
      const { idOrSlug } = req.params;
  
      const movie = await Movie.findOne({
        $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
      })
        .populate("categoryId", "name")
        .populate("languageId", "name");
  
      if (!movie) return res.status(404).json({ message: "Movie not found" });
  
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const updateMovie = async (req, res) => {
    try {
      const updated = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Movie not found" });
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const deleteMovie = async (req, res) => {
    try {
      const deleted = await Movie.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Movie not found" });
  
      res.json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  