import Language from "../models/language.model.js";

// Create a new language
export const createLanguage = async (req, res) => {
  const { name, code } = req.body;

  try {
    const languageExists = await Language.findOne({ code });

    if (languageExists) {
      return res.status(400).json({ message: "Language code already exists" });
    }

    const newLanguage = new Language({
      name,
      code,
    });

    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all languages
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find({ isActive: true }).sort({ name: 1 });
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a specific language by ID or code
export const getLanguageById = async (req, res) => {
  const { id } = req.params;

  try {
    const language = await Language.findById(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a language by ID
export const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { name, code, isActive } = req.body;

  try {
    const language = await Language.findById(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    language.name = name || language.name;
    language.code = code || language.code;
    language.isActive = isActive !== undefined ? isActive : language.isActive;

    await language.save();
    res.json(language);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a language
export const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  try {
    const language = await Language.findById(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    language.isActive = false; // Soft delete by marking isActive as false
    await language.save();
    res.json({ message: "Language deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

