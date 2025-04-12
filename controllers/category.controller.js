import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, slug } = req.body;

    // Validation
    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this slug already exists" });
    }

    const category = new Category({ name, description, slug });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().sort({ name: 1 }); // Sorted by name
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const getCategoryByIdOrSlug = async (req, res) => {
    try {
      const { idOrSlug } = req.params;
  
      // Look for category by either _id or slug
      const category = await Category.findOne({
        $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
      });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const updateCategory = async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json(updatedCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const deleteCategory = async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  