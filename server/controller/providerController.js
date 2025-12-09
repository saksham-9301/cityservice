const ServiceProvider = require("../models/ServiceProvider");

exports.createProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.create({
      ...req.body
    });

    res.json({ message: "Provider added", provider });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find().populate("userId").populate("categoryId");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
