const ServiceCategory = require("../models/ServiceCategory");

exports.createCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.create(req.body);
    res.json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.searchCategories = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const categories = await Category.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { keywords: { $regex: name, $options: "i" } }
      ]
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

