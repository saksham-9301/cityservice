const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { 
  createProvider, 
  getProviders, 
  getProvidersByCategory,
  getProviderProfile,
  updateProvider,
  getMyProviderProfile
} = require("../controller/providerController");

// Public routes
router.get("/", getProviders);
router.get("/category/:categoryId", getProvidersByCategory);
router.get("/profile/:providerId", getProviderProfile);

// Protected routes
router.post("/", auth, createProvider);
router.put("/:providerId", auth, updateProvider);
router.get("/my/profile", auth, getMyProviderProfile);

module.exports = router;
