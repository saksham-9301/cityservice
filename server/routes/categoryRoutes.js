const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  searchCategories,
} = require("../controller/categoryController");

router.post("/", auth, createCategory); // only logged-in users (admin ideally)
router.get("/", getCategories);
router.get("/search", searchCategories);

module.exports = router;
