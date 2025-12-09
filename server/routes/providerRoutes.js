const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createProvider, getProviders } = require("../controller/providerController");

router.post("/",  createProvider);
router.get("/", getProviders);

module.exports = router;
