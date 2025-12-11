// Seed script to add sample service categories to MongoDB
// Run this once with: node seedCategories.js

const mongoose = require("mongoose");
const ServiceCategory = require("./models/ServiceCategory");

const MONGODB_URI = "mongodb+srv://sakshamjain_db_user:0000@cluster0.unw8kvr.mongodb.net/?appName=Cluster0";

const sampleCategories = [
  {
    name: "Cleaning",
    description: "Home & office deep cleaning, sanitization and maintenance.",
    keywords: ["clean", "sanitize", "maintenance", "hygiene"],
    icon: "🧹"
  },
  {
    name: "Plumbing",
    description: "Fix leaks, installs, drainage and pipe replacement.",
    keywords: ["plumber", "leaks", "pipes", "drainage", "installation"],
    icon: "🔧"
  },
  {
    name: "Electrical",
    description: "Wiring, fixtures, power issues and emergency repairs.",
    keywords: ["electrician", "wiring", "fixtures", "repairs"],
    icon: "⚡"
  },
  {
    name: "Painting",
    description: "Interior & exterior painting, color consultation.",
    keywords: ["painter", "interior", "exterior", "color"],
    icon: "🎨"
  },
  {
    name: "Carpentry",
    description: "Custom furniture, repairs and fittings.",
    keywords: ["carpenter", "furniture", "repairs", "fittings"],
    icon: "🪚"
  },
  {
    name: "HVAC",
    description: "Heating, ventilation, air conditioning services.",
    keywords: ["hvac", "heating", "cooling", "air conditioning"],
    icon: "❄️"
  },
  {
    name: "Landscaping",
    description: "Garden design, maintenance and yard work.",
    keywords: ["landscaping", "garden", "yard", "maintenance"],
    icon: "🌿"
  },
  {
    name: "Pest Control",
    description: "Professional pest elimination and prevention.",
    keywords: ["pest", "insects", "rodents", "control"],
    icon: "🐜"
  }
];

async function seedCategories() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check existing categories
    const existing = await ServiceCategory.find({});
    if (existing.length > 0) {
      console.log(`⚠️  Found ${existing.length} existing categories. Skipping seed.`);
      console.log("✅ Existing categories:");
      existing.forEach(cat => {
        console.log(`  - ${cat.name} (${cat.icon})`);
      });
      await mongoose.connection.close();
      return;
    }

    // Insert sample categories
    const result = await ServiceCategory.insertMany(sampleCategories);
    console.log(`✅ Successfully added ${result.length} service categories`);
    console.log("\nAdded categories:");
    result.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.icon})`);
    });

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

seedCategories();
