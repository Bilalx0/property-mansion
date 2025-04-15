const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://leafy-salamander-9c8dbb.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Schemas
const heroSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);

const mansionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    btntext: { type: String, required: true },
  },
  { timestamps: true }
);

const Mansion = mongoose.model("Mansion", mansionSchema);

const penthouseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    btntext: { type: String, required: true },
  },
  { timestamps: true }
);

const Penthouse = mongoose.model("Penthouse", penthouseSchema);

const collectionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    btntext: { type: String, required: true },
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", collectionSchema);

const magazineSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Magazine = mongoose.model("Magazine", magazineSchema);

const mansionDetailSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    propertytype: { type: String, required: true },
    size: { type: String, required: true },
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    furnishingtype: { type: String, required: true },
    builtuparea: { type: String, required: true },
    projectstatus: { type: String, required: true },
    community: { type: String, required: true },
    subcommunity: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    amenities: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: false },
    propertyaddress: { type: String, required: true },
    unitno: { type: String, required: true },
    tag: { type: String, required: true },
    status: { type: String, required: true },
    agentname: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsaapno: { type: String, required: true },
    callno: { type: String, required: true },
    agentimage: { type: String, required: true },
  },
  { timestamps: true }
);

const MansionDetail = mongoose.model("MansionDetail", mansionDetailSchema);

const magazineDetailSchema = new mongoose.Schema(
  
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [500, "Sub-title cannot exceed 500 characters"],
    },
    time: {
      type: Date,
      required: [true, "Time is required"],
    },
    mainImage: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MagazineDetail = mongoose.model("MagazineDetail", magazineDetailSchema);

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

const magazineEmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const MagazineEmail = mongoose.model("MagazineEmail", magazineEmailSchema);

const inquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);


const featuredPropertiesSchema = new mongoose.Schema(
  {
    references: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const FeaturedProperties = mongoose.model("FeaturedProperties", featuredPropertiesSchema);

// ... (keep existing imports: express, mongoose, cors, multer, path, dotenv)
// ... (keep existing middleware, MongoDB connection, and multer setup)

// Existing Schemas (Hero, Mansion, Penthouse, Collectibles, Magazine, MansionDetail, FeaturedProperties)

// New Schemas for Featured References
const mansionFeaturedSchema = new mongoose.Schema(
  {
    references: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const penthouseFeaturedSchema = new mongoose.Schema(
  {
    references: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const collectiblesFeaturedSchema = new mongoose.Schema(
  {
    references: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const MansionFeatured = mongoose.model('MansionFeatured', mansionFeaturedSchema);
const PenthouseFeatured = mongoose.model('PenthouseFeatured', penthouseFeaturedSchema);
const CollectiblesFeatured = mongoose.model('CollectiblesFeatured', collectiblesFeaturedSchema);

// ... (keep existing routes: Hero, Mansion, Penthouse, Collectibles, Magazine, FeaturedProperties)

// New Routes for Featured References
// Mansion Featured
app.post('/api/mansion/featured', async (req, res) => {
  try {
    const { references } = req.body;

    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: 'At least one reference number is required' });
    }

    for (const ref of references) {
      if (ref) {
        const property = await MansionDetail.findOne({ reference: ref });
        if (!property) {
          return res.status(400).json({ error: `Reference number ${ref} not found` });
        }
      }
    }

    const validReferences = [...new Set(references.filter(ref => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: 'Maximum of four reference numbers allowed' });
    }

    const featured = await MansionFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'Mansion featured properties saved successfully', data: featured });
  } catch (error) {
    console.error('Error saving mansion featured properties:', error);
    res.status(500).json({ message: 'Failed to save mansion featured properties' });
  }
});

app.get('/api/mansion/featured', async (req, res) => {
  try {
    const featured = await MansionFeatured.findOne();
    if (!featured || !featured.references.length) {
      return res.json([]);
    }

    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    });

    const orderedProperties = featured.references
      .map(ref => properties.find(prop => prop.reference === ref))
      .filter(prop => prop);

    res.json(orderedProperties);
  } catch (error) {
    console.error('Error fetching mansion featured properties:', error);
    res.status(500).json({ message: 'Failed to fetch mansion featured properties' });
  }
});

// Penthouse Featured
app.post('/api/penthouse/featured', async (req, res) => {
  try {
    const { references } = req.body;

    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: 'At least one reference number is required' });
    }

    for (const ref of references) {
      if (ref) {
        const property = await MansionDetail.findOne({ reference: ref });
        if (!property) {
          return res.status(400).json({ error: `Reference number ${ref} not found` });
        }
      }
    }

    const validReferences = [...new Set(references.filter(ref => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: 'Maximum of four reference numbers allowed' });
    }

    const featured = await PenthouseFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'Penthouse featured properties saved successfully', data: featured });
  } catch (error) {
    console.error('Error saving penthouse featured properties:', error);
    res.status(500).json({ message: 'Failed to save penthouse featured properties' });
  }
});

app.get('/api/penthouse/featured', async (req, res) => {
  try {
    const featured = await PenthouseFeatured.findOne();
    if (!featured || !featured.references.length) {
      return res.json([]);
    }

    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    });

    const orderedProperties = featured.references
      .map(ref => properties.find(prop => prop.reference === ref))
      .filter(prop => prop);

    res.json(orderedProperties);
  } catch (error) {
    console.error('Error fetching penthouse featured properties:', error);
    res.status(500).json({ message: 'Failed to fetch penthouse featured properties' });
  }
});

// Collectibles Featured
app.post('/api/collectibles/featured', async (req, res) => {
  try {
    const { references } = req.body;

    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: 'At least one reference number is required' });
    }

    for (const ref of references) {
      if (ref) {
        const property = await MansionDetail.findOne({ reference: ref });
        if (!property) {
          return res.status(400).json({ error: `Reference number ${ref} not found` });
        }
      }
    }

    const validReferences = [...new Set(references.filter(ref => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: 'Maximum of four reference numbers allowed' });
    }

    const featured = await CollectiblesFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'Collectibles featured properties saved successfully', data: featured });
  } catch (error) {
    console.error('Error saving collectibles featured properties:', error);
    res.status(500).json({ message: 'Failed to save collectibles featured properties' });
  }
});

app.get('/api/collectibles/featured', async (req, res) => {
  try {
    const featured = await CollectiblesFeatured.findOne();
    if (!featured || !featured.references.length) {
      return res.json([]);
    }

    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    });

    const orderedProperties = featured.references
      .map(ref => properties.find(prop => prop.reference === ref))
      .filter(prop => prop);

    res.json(orderedProperties);
  } catch (error) {
    console.error('Error fetching collectibles featured properties:', error);
    res.status(500).json({ message: 'Failed to fetch collectibles featured properties' });
  }
});

// Routes

// Hero Section
app.post("/api/hero", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!heading || !subheading || !imagePath) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newHero = new Hero({ heading, subheading, image: imagePath });
    await newHero.save();
    res.status(201).json({ message: "Hero content added successfully", data: newHero });
  } catch (error) {
    console.error("Error saving hero content:", error);
    res.status(500).json({ message: "Failed to add hero content" });
  }
});

app.get("/api/hero", async (req, res) => {
  try {
    const heroContent = await Hero.find().sort({ createdAt: -1 }).limit(1);
    res.json(heroContent[0] || {});
  } catch (error) {
    console.error("Error fetching hero content:", error);
    res.status(500).json({ message: "Failed to fetch hero content" });
  }
});

app.get("/api/heroes", async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ message: "Failed to fetch heroes" });
  }
});

app.get("/api/hero/:id", async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json(hero);
  } catch (error) {
    console.error("Error fetching hero:", error);
    res.status(500).json({ message: "Failed to fetch hero" });
  }
});

app.put("/api/hero/:id", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { heading, subheading };
    if (imagePath) updateData.image = imagePath;

    const hero = await Hero.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json({ message: "Hero updated successfully", data: hero });
  } catch (error) {
    console.error("Error updating hero:", error);
    res.status(500).json({ message: "Failed to update hero" });
  }
});

app.delete("/api/hero/:id", async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error("Error deleting hero:", error);
    res.status(500).json({ message: "Failed to delete hero" });
  }
});

// Mansion Section
app.post("/api/mansion", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMansion = new Mansion({ description, btntext });
    await newMansion.save();
    res.status(201).json({ message: "Mansion content added successfully", data: newMansion });
  } catch (error) {
    console.error("Error saving mansion content:", error);
    res.status(500).json({ message: "Failed to add mansion content" });
  }
});

app.get("/api/mansion", async (req, res) => {
  try {
    const mansionContent = await Mansion.find().sort({ createdAt: -1 }).limit(1);
    res.json(mansionContent[0] || {});
  } catch (error) {
    console.error("Error fetching mansion content:", error);
    res.status(500).json({ message: "Failed to fetch mansion content" });
  }
});

app.get("/api/mansions", async (req, res) => {
  try {
    const mansions = await Mansion.find().sort({ createdAt: -1 });
    res.json(mansions);
  } catch (error) {
    console.error("Error fetching mansions:", error);
    res.status(500).json({ message: "Failed to fetch mansions" });
  }
});

app.get("/api/mansion/:id", async (req, res) => {
  try {
    const mansion = await Mansion.findById(req.params.id);
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json(mansion);
  } catch (error) {
    console.error("Error fetching mansion:", error);
    res.status(500).json({ message: "Failed to fetch mansion" });
  }
});

app.put("/api/mansion/:id", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    const mansion = await Mansion.findByIdAndUpdate(
      req.params.id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json({ message: "Mansion updated successfully", data: mansion });
  } catch (error) {
    console.error("Error updating mansion:", error);
    res.status(500).json({ message: "Failed to update mansion" });
  }
});

app.delete("/api/mansion/:id", async (req, res) => {
  try {
    const mansion = await Mansion.findByIdAndDelete(req.params.id);
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json({ message: "Mansion deleted successfully" });
  } catch (error) {
    console.error("Error deleting mansion:", error);
    res.status(500).json({ message: "Failed to delete mansion" });
  }
});

// Penthouse Section
app.post("/api/penthouse", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPenthouse = new Penthouse({ description, btntext });
    await newPenthouse.save();
    res.status(201).json({ message: "Penthouse content added successfully", data: newPenthouse });
  } catch (error) {
    console.error("Error saving penthouse content:", error);
    res.status(500).json({ message: "Failed to add penthouse content" });
  }
});

app.get("/api/penthouse", async (req, res) => {
  try {
    const penthouseContent = await Penthouse.find().sort({ createdAt: -1 }).limit(1);
    res.json(penthouseContent[0] || {});
  } catch (error) {
    console.error("Error fetching penthouse content:", error);
    res.status(500).json({ message: "Failed to fetch penthouse content" });
  }
});

app.get("/api/penthouses", async (req, res) => {
  try {
    const penthouses = await Penthouse.find().sort({ createdAt: -1 });
    res.json(penthouses);
  } catch (error) {
    console.error("Error fetching penthouses:", error);
    res.status(500).json({ message: "Failed to fetch penthouses" });
  }
});

app.get("/api/penthouse/:id", async (req, res) => {
  try {
    const penthouse = await Penthouse.findById(req.params.id);
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json(penthouse);
  } catch (error) {
    console.error("Error fetching penthouse:", error);
    res.status(500).json({ message: "Failed to fetch penthouse" });
  }
});

app.put("/api/penthouse/:id", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    const penthouse = await Penthouse.findByIdAndUpdate(
      req.params.id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json({ message: "Penthouse updated successfully", data: penthouse });
  } catch (error) {
    console.error("Error updating penthouse:", error);
    res.status(500).json({ message: "Failed to update penthouse" });
  }
});

app.delete("/api/penthouse/:id", async (req, res) => {
  try {
    const penthouse = await Penthouse.findByIdAndDelete(req.params.id);
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json({ message: "Penthouse deleted successfully" });
  } catch (error) {
    console.error("Error deleting penthouse:", error);
    res.status(500).json({ message: "Failed to delete penthouse" });
  }
});

// Collection Section
app.post("/api/collectibles", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCollection = new Collection({ description, btntext });
    await newCollection.save();
    res.status(201).json({ message: "Collection added successfully", data: newCollection });
  } catch (error) {
    console.error("Error adding collection:", error);
    res.status(500).json({ message: "Failed to add collection" });
  }
});

app.get("/api/collectibles", async (req, res) => {
  try {
    const collectionContent = await Collection.find().sort({ createdAt: -1 }).limit(1);
    res.json(collectionContent[0] || {});
  } catch (error) {
    console.error("Error fetching collection content:", error);
    res.status(500).json({ message: "Failed to fetch collection content" });
  }
});

app.get("/api/collections", async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Failed to fetch collections" });
  }
});

app.get("/api/collectibles/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ message: "Failed to fetch collection" });
  }
});

app.put("/api/collectibles/:id", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json({ message: "Collection updated successfully", data: collection });
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ message: "Failed to update collection" });
  }
});

app.delete("/api/collectibles/:id", async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Failed to delete collection" });
  }
});

// Magazine Section
app.post("/api/magazine", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!heading || !subheading || !imagePath) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMagazine = new Magazine({ heading, subheading, image: imagePath });
    await newMagazine.save();
    res.status(201).json({ message: "Magazine content added successfully", data: newMagazine });
  } catch (error) {
    console.error("Error saving magazine content:", error);
    res.status(500).json({ message: "Failed to add magazine content" });
  }
});

app.get("/api/magazine", async (req, res) => {
  try {
    const magazineContent = await Magazine.find().sort({ createdAt: -1 }).limit(1);
    res.json(magazineContent[0] || {});
  } catch (error) {
    console.error("Error fetching magazine content:", error);
    res.status(500).json({ message: "Failed to fetch magazine content" });
  }
});

app.get("/api/magazines", async (req, res) => {
  try {
    const magazines = await Magazine.find().sort({ createdAt: -1 });
    res.json(magazines);
  } catch (error) {
    console.error("Error fetching magazines:", error);
    res.status(500).json({ message: "Failed to fetch magazines" });
  }
});

app.get("/api/magazine/:id", async (req, res) => {
  try {
    const magazine = await Magazine.findById(req.params.id);
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json(magazine);
  } catch (error) {
    console.error("Error fetching magazine:", error);
    res.status(500).json({ message: "Failed to fetch magazine" });
  }
});

app.put("/api/magazine/:id", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { heading, subheading };
    if (imagePath) updateData.image = imagePath;

    const magazine = await Magazine.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json({ message: "Magazine updated successfully", data: magazine });
  } catch (error) {
    console.error("Error updating magazine:", error);
    res.status(500).json({ message: "Failed to update magazine" });
  }
});

app.delete("/api/magazine/:id", async (req, res) => {
  try {
    const magazine = await Magazine.findByIdAndDelete(req.params.id);
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json({ message: "Magazine deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine:", error);
    res.status(500).json({ message: "Failed to delete magazine" });
  }
});

// MansionDetail Section
const propertyUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "agentimage", maxCount: 1 },
]);

app.post("/api/propertyDetail", propertyUpload, async (req, res) => {
  try {
    const { reference, ...propertyData } = req.body;

    const existingProperty = await MansionDetail.findOne({ reference });
    if (existingProperty) {
      return res.status(400).json({ message: "Property with this reference already exists" });
    }

    const filePaths = {
      image: req.files["image"]?.[0]?.filename ? `/uploads/${req.files["image"][0].filename}` : null,
      video: req.files["video"]?.[0]?.filename ? `/uploads/${req.files["video"][0].filename}` : null,
      agentimage: req.files["agentimage"]?.[0]?.filename
        ? `/uploads/${req.files["agentimage"][0].filename}`
        : null,
    };

    if (!filePaths.image || !filePaths.agentimage) {
      return res.status(400).json({ message: "Image and agent image are required" });
    }

    const newProperty = new MansionDetail({
      reference,
      ...propertyData,
      ...filePaths,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property saved successfully", data: newProperty });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate reference number" });
    } else {
      console.error("Error saving property:", error);
      res.status(500).json({ message: "Failed to save property" });
    }
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await MansionDetail.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

app.get("/api/mansions/:reference", async (req, res) => {
  try {
    const property = await MansionDetail.findOne({ reference: req.params.reference });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Failed to fetch property" });
  }
});

app.get("/api/propertyDetail/:id", async (req, res) => {
  try {
    const property = await MansionDetail.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Failed to fetch property" });
  }
});

app.put("/api/propertyDetail/:id", propertyUpload, async (req, res) => {
  try {
    const { reference, ...propertyData } = req.body;

    const existingProperty = await MansionDetail.findOne({ reference, _id: { $ne: req.params.id } });
    if (existingProperty) {
      return res.status(400).json({ message: "Property with this reference already exists" });
    }

    const filePaths = {
      image: req.files["image"]?.[0]?.filename ? `/uploads/${req.files["image"][0].filename}` : undefined,
      video: req.files["video"]?.[0]?.filename ? `/uploads/${req.files["video"][0].filename}` : undefined,
      agentimage: req.files["agentimage"]?.[0]?.filename
        ? `/uploads/${req.files["agentimage"][0].filename}`
        : undefined,
    };

    const updateData = { reference, ...propertyData, ...filePaths };
    Object.keys(filePaths).forEach((key) => {
      if (filePaths[key] === undefined) delete updateData[key];
    });

    const property = await MansionDetail.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated successfully", data: property });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate reference number" });
    } else {
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  }
});

app.delete("/api/propertyDetail/:id", async (req, res) => {
  try {
    const property = await MansionDetail.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Failed to delete property" });
  }
});

// MagazineDetail Section
app.post("/api/magazineDetail", upload.single("mainImage"), async (req, res) => {
  try {
    const { author, title, subtitle, time, content, category } = req.body; // Add category
    const mainImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    if (!author || !title || !time || !content || !category) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newMagazineDetail = new MagazineDetail({
      author,
      title,
      subtitle,
      time,
      mainImage,
      content,
      category, // Include category
    });
    await newMagazineDetail.save();
    res.status(201).json({ message: "Magazine article added successfully", data: newMagazineDetail });
  } catch (error) {
    console.error("Error saving magazine article:", error);
    // Provide more specific error messages
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join(", ") });
    }
    res.status(500).json({ message: "Failed to add magazine article", error: error.message });
  }
});

app.get("/api/magazineDetails", async (req, res) => {
  try {
    const magazineDetails = await MagazineDetail.find().sort({ createdAt: -1 });
    res.json(magazineDetails);
  } catch (error) {
    console.error("Error fetching magazine articles:", error);
    res.status(500).json({ message: "Failed to fetch magazine articles" });
  }
});

app.get("/api/magazineDetail/:id", async (req, res) => {
  try {
    const magazineDetail = await MagazineDetail.findById(req.params.id);
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json(magazineDetail);
  } catch (error) {
    console.error("Error fetching magazine article:", error);
    res.status(500).json({ message: "Failed to fetch magazine article" });
  }
});

app.put("/api/magazineDetail/:id", upload.single("mainImage"), async (req, res) => {
  try {
    const { author, title, subtitle, time, content } = req.body;
    const mainImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { author, title, subtitle, time, content };
    if (mainImage) updateData.mainImage = mainImage;

    const magazineDetail = await MagazineDetail.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json({ message: "Magazine article updated successfully", data: magazineDetail });
  } catch (error) {
    console.error("Error updating magazine article:", error);
    res.status(500).json({ message: "Failed to update magazine article" });
  }
});

app.delete("/api/magazineDetail/:id", async (req, res) => {
  try {
    const magazineDetail = await MagazineDetail.findByIdAndDelete(req.params.id);
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json({ message: "Magazine article deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine article:", error);
    res.status(500).json({ message: "Failed to delete magazine article" });
  }
});

// Newsletter Section
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email, category } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const newNewsletter = new Newsletter({ email, category: category || "Newsletter"});
    await newNewsletter.save();
    res.status(201).json({ message: "Email added to newsletter successfully" });
  } catch (error) {
    console.error("Error adding email to newsletter:", error);
    res.status(500).json({ message: "Failed to add email to newsletter" });
  }
});

app.get("/api/newsletter", async (req, res) => {
  try {
    const newsletter = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({ message: "Failed to fetch newsletter" });
  }
});

app.get("/api/newsletter/:id", async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter entry:", error);
    res.status(500).json({ message: "Failed to fetch newsletter entry" });
  }
});

app.put("/api/newsletter/:id", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const newsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true, runValidators: true }
    );
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json({ message: "Newsletter entry updated successfully", data: newsletter });
  } catch (error) {
    console.error("Error updating newsletter entry:", error);
    res.status(500).json({ message: "Failed to update newsletter entry" });
  }
});

app.delete("/api/newsletter/:id", async (req, res) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json({ message: "Newsletter entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter entry:", error);
    res.status(500).json({ message: "Failed to delete newsletter entry" });
  }
});

// MagazineEmail Section
app.post("/api/magazineEmail", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const newMagazineEmail = new MagazineEmail({ email });
    await newMagazineEmail.save();
    res.status(201).json({ message: "Email added to magazine email list successfully" });
  } catch (error) {
    console.error("Error adding email to magazine email list:", error);
    res.status(500).json({ message: "Failed to add email to magazine email list" });
  }
});

app.get("/api/magazineEmail", async (req, res) => {
  try {
    const magazineEmail = await MagazineEmail.find().sort({ createdAt: -1 });
    res.json(magazineEmail);
  } catch (error) {
    console.error("Error fetching magazine email list:", error);
    res.status(500).json({ message: "Failed to fetch magazine email list" });
  }
});

app.get("/api/magazineEmail/:id", async (req, res) => {
  try {
    const magazineEmail = await MagazineEmail.findById(req.params.id);
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json(magazineEmail);
  } catch (error) {
    console.error("Error fetching magazine email entry:", error);
    res.status(500).json({ message: "Failed to fetch magazine email entry" });
  }
});

app.put("/api/magazineEmail/:id", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const magazineEmail = await MagazineEmail.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true, runValidators: true }
    );
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json({ message: "Magazine email entry updated successfully", data: magazineEmail });
  } catch (error) {
    console.error("Error updating magazine email entry:", error);
    res.status(500).json({ message: "Failed to update magazine email entry" });
  }
});

app.delete("/api/magazineEmail/:id", async (req, res) => {
  try {
    const magazineEmail = await MagazineEmail.findByIdAndDelete(req.params.id);
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json({ message: "Magazine email entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine email entry:", error);
    res.status(500).json({ message: "Failed to delete magazine email entry" });
  }
});

// Inquiry Section
app.post("/api/inquiries", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newInquiry = new Inquiry({ firstName, lastName, email, phone, message });
    await newInquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully", data: newInquiry });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ message: "Failed to submit inquiry" });
  }
});

app.get("/api/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

app.get("/api/inquiries/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({ message: "Failed to fetch inquiry" });
  }
});

app.put("/api/inquiries/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, message },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry updated successfully", data: inquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ message: "Failed to update inquiry" });
  }
});

app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ message: "Failed to delete inquiry" });
  }
});

app.post("/api/featured", async (req, res) => {
  try {
    const { references } = req.body;

    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: "At least one reference number is required" });
    }

    for (const ref of references) {
      if (ref) {
        const property = await MansionDetail.findOne({ reference: ref });
        if (!property) {
          return res.status(400).json({ error: `Reference number ${ref} not found` });
        }
      }
    }

    const validReferences = [...new Set(references.filter(ref => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: "Maximum of four reference numbers allowed" });
    }

    const featured = await FeaturedProperties.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: "Featured properties saved successfully", data: featured });
  } catch (error) {
    console.error("Error saving featured properties:", error);
    res.status(500).json({ message: "Failed to save featured properties" });
  }
});


app.get("/api/featured", async (req, res) => {
  try {
    const featured = await FeaturedProperties.findOne();
    if (!featured || !featured.references.length) {
      return res.json([]);
    }

    // Fetch full property details for the references
    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    });

    // Preserve the order of references
    const orderedProperties = featured.references
      .map(ref => properties.find(prop => prop.reference === ref))
      .filter(prop => prop);

    res.json(orderedProperties);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    res.status(500).json({ message: "Failed to fetch featured properties" });
  }
});

// Server startup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
