const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    icon: {
      type: String,  // optional icon url
    },

    description: {
      type: String,
    },
    keywords: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
