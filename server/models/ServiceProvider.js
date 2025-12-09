const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    experience: {
      type: String,
    },

    description: {
      type: String,
    },

    availability: [
      {
        day: String,
        timeStart: String,
        timeEnd: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
