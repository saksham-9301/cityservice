const ServiceProvider = require("../models/ServiceProvider");
const User = require("../models/User");

exports.createProvider = async (req, res) => {
  try {
    const { categoryId, price, experience, description, availability } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate required fields
    if (!categoryId || !price) {
      return res.status(400).json({ message: "Category and price are required" });
    }

    // Check if user is already a provider for this category
    const existingProvider = await ServiceProvider.findOne({ userId, categoryId });
    if (existingProvider) {
      return res.status(400).json({ message: "You are already a provider for this service category" });
    }

    // Update user role to provider
    await User.findByIdAndUpdate(userId, { role: "provider" });

    const provider = await ServiceProvider.create({
      userId,
      categoryId,
      price,
      experience,
      description,
      availability: availability || []
    });

    const populatedProvider = await ServiceProvider.findById(provider._id)
      .populate("userId")
      .populate("categoryId");

    res.json({ message: "Provider profile created successfully", provider: populatedProvider });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find()
      .populate("userId")
      .populate("categoryId");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProvidersByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const providers = await ServiceProvider.find({ categoryId })
      .populate("userId")
      .populate("categoryId");

    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviderProfile = async (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = await ServiceProvider.findById(providerId)
      .populate("userId")
      .populate("categoryId");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const userId = req.user.id;

    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Check authorization
    if (provider.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this provider" });
    }

    const updatedProvider = await ServiceProvider.findByIdAndUpdate(
      providerId,
      req.body,
      { new: true }
    ).populate("userId").populate("categoryId");

    res.json({ message: "Provider updated successfully", provider: updatedProvider });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const provider = await ServiceProvider.findOne({ userId })
      .populate("userId")
      .populate("categoryId");

    if (!provider) {
      return res.status(404).json({ message: "You don't have a provider profile yet" });
    }

    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
