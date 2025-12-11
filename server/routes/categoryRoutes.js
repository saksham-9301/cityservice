const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  getCategoryById,
  searchCategories,
  updateCategory,
  deleteCategory
} = require("../controller/categoryController");

// Public routes
router.get("/", getCategories);
router.get("/search", searchCategories);
router.get("/:categoryId", getCategoryById);

// Protected routes (admin only)
router.post("/", auth, createCategory);
router.put("/:categoryId", auth, updateCategory);
router.delete("/:categoryId", auth, deleteCategory);

module.exports = router;
