const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Validate MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables.");
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate Cloudinary config
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Cloudinary configuration is incomplete. Check environment variables.");
}

// Multer configuration with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Uploads",
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

const propertyUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "agentimage", maxCount: 1 },
]);

// Authentication Middleware
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

// Schemas
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "superadmin"], required: true },
});

const User = mongoose.model("User", userSchema);

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
    category: { type: String, required: [true, "Category is required"] },
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
    time: { type: Date, required: [true, "Time is required"] },
    mainImage: { type: String, trim: true },
    content: { type: String, required: [true, "Content is required"] },
    createdAt: { type: Date, default: Date.now },
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
    references: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

const FeaturedProperties = mongoose.model("FeaturedProperties", featuredPropertiesSchema);

const mansionFeaturedSchema = new mongoose.Schema(
  {
    references: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

const penthouseFeaturedSchema = new mongoose.Schema(
  {
    references: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

const collectiblesFeaturedSchema = new mongoose.Schema(
  {
    references: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

const MansionFeatured = mongoose.model("MansionFeatured", mansionFeaturedSchema);
const PenthouseFeatured = mongoose.model("PenthouseFeatured", penthouseFeaturedSchema);
const CollectiblesFeatured = mongoose.model("CollectiblesFeatured", collectiblesFeaturedSchema);

// Authentication Routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User created successfully",
      token,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
});

// Dashboard Routes
app.get("/api/dashboard/admin", authMiddleware(["admin"]), async (req, res) => {
  try {
    const properties = await MansionDetail.find().lean();
    res.json({ message: "Admin dashboard data", properties });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch admin dashboard", error: error.message });
  }
});

app.get("/api/dashboard/superadmin", authMiddleware(["superadmin"]), async (req, res) => {
  try {
    const users = await User.find().lean();
    const properties = await MansionDetail.find().lean();
    res.json({ message: "Superadmin dashboard data", users, properties });
  } catch (error) {
    console.error("Superadmin dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch superadmin dashboard", error: error.message });
  }
});

// Hero Section
app.post("/api/hero", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file?.path;
    if (!heading || !subheading || !imagePath) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newHero = new Hero({ heading, subheading, image: imagePath });
    await newHero.save();
    res.status(201).json({ message: "Hero content added successfully", data: newHero });
  } catch (error) {
    console.error("Error saving hero content:", error);
    res.status(500).json({ message: "Failed to add hero content", error: error.message });
  }
});

app.get("/api/hero", async (req, res) => {
  try {
    const heroContent = await Hero.find().sort({ createdAt: -1 }).limit(1).lean();
    res.json(heroContent[0] || {});
  } catch (error) {
    console.error("Error fetching hero content:", error);
    res.status(500).json({ message: "Failed to fetch hero content", error: error.message });
  }
});

app.get("/api/heroes", async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 }).lean();
    res.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ message: "Failed to fetch heroes", error: error.message });
  }
});

app.get("/api/hero/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const hero = await Hero.findById(id).lean();
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json(hero);
  } catch (error) {
    console.error("Error fetching hero:", error);
    res.status(500).json({ message: "Failed to fetch hero", error: error.message });
  }
});

app.put("/api/hero/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, subheading } = req.body;
    const imagePath = req.file?.path;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const updateData = { heading, subheading };
    if (imagePath) updateData.image = imagePath;
    const hero = await Hero.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json({ message: "Hero updated successfully", data: hero });
  } catch (error) {
    console.error("Error updating hero:", error);
    res.status(500).json({ message: "Failed to update hero", error: error.message });
  }
});

app.delete("/api/hero/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const hero = await Hero.findByIdAndDelete(id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error("Error deleting hero:", error);
    res.status(500).json({ message: "Failed to delete hero", error: error.message });
  }
});

// Mansion Section
app.post("/api/mansion", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    console.log("POST /api/mansion received:", { description, btntext });
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMansion = new Mansion({ description, btntext });
    await newMansion.save();
    console.log("Saved mansion content:", newMansion);
    res.status(201).json({ message: "Mansion content added successfully", data: newMansion });
  } catch (error) {
    console.error("Error saving mansion content:", error);
    res.status(500).json({ message: "Failed to add mansion content", error: error.message });
  }
});

app.get("/api/mansion", async (req, res) => {
  try {
    console.log("GET /api/mansion called");
    const mansionContent = await Mansion.find().sort({ createdAt: -1 }).limit(1).lean();
    console.log("Fetched mansion content:", mansionContent);
    res.json(mansionContent[0] || {});
  } catch (error) {
    console.error("Error fetching mansion content:", error);
    res.status(500).json({ message: "Failed to fetch mansion content", error: error.message });
  }
});

// Mansion Featured (Placed BEFORE /api/mansion/:id to avoid routing conflict)
app.get("/api/mansion/featured", async (req, res) => {
  try {
    console.log("GET /api/mansion/featured called");
    const featured = await MansionFeatured.findOne().lean();
    console.log("Fetched mansion featured:", featured);
    if (!featured || !Array.isArray(featured.references) || !featured.references.length) {
      console.log("No mansion featured properties found, returning empty array");
      return res.json([]);
    }
    console.log("Fetching properties with references:", featured.references);
    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    }).lean();
    console.log("Found properties:", properties);
    const orderedProperties = featured.references
      .map((ref) => properties.find((prop) => prop.reference === ref))
      .filter((prop) => prop);
    console.log("Returning ordered properties:", orderedProperties);
    res.json(orderedProperties);
  } catch (error) {
    console.error("Error fetching mansion featured properties:", error.stack);
    res.status(500).json({ message: "Failed to fetch mansion featured properties", error: error.message });
  }
});

app.post("/api/mansion/featured", async (req, res) => {
  try {
    console.log("POST /api/mansion/featured called with:", req.body);
    const { references } = req.body;
    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: "At least one reference number is required" });
    }
    const validReferences = [...new Set(references.filter((ref) => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: "Maximum of four reference numbers allowed" });
    }
    for (const ref of validReferences) {
      const property = await MansionDetail.findOne({ reference: ref }).lean();
      if (!property) {
        return res.status(400).json({ error: `Reference number ${ref} not found` });
      }
    }
    const featured = await MansionFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );
    console.log("Saved mansion featured:", featured);
    res.status(201).json({ message: "Mansion featured properties saved successfully", data: featured });
  } catch (error) {
    console.error("Error saving mansion featured properties:", error.stack);
    res.status(500).json({ message: "Failed to save mansion featured properties", error: error.message });
  }
});

// Mansion ID Routes (Placed AFTER /api/mansion/featured)
app.get("/api/mansion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/mansion/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const mansion = await Mansion.findById(id).lean();
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json(mansion);
  } catch (error) {
    console.error("Error fetching mansion:", error);
    res.status(500).json({ message: "Failed to fetch mansion", error: error.message });
  }
});

app.get("/api/mansions", async (req, res) => {
  try {
    console.log("GET /api/mansions called");
    const mansions = await Mansion.find().sort({ createdAt: -1 }).lean();
    res.json(mansions);
  } catch (error) {
    console.error("Error fetching mansions:", error);
    res.status(500).json({ message: "Failed to fetch mansions", error: error.message });
  }
});

app.put("/api/mansion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, btntext } = req.body;
    console.log(`PUT /api/mansion/${id} called with:`, { description, btntext });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const mansion = await Mansion.findByIdAndUpdate(
      id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json({ message: "Mansion updated successfully", data: mansion });
  } catch (error) {
    console.error("Error updating mansion:", error);
    res.status(500).json({ message: "Failed to update mansion", error: error.message });
  }
});

app.delete("/api/mansion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/mansion/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const mansion = await Mansion.findByIdAndDelete(id);
    if (!mansion) return res.status(404).json({ message: "Mansion not found" });
    res.json({ message: "Mansion deleted successfully" });
  } catch (error) {
    console.error("Error deleting mansion:", error);
    res.status(500).json({ message: "Failed to delete mansion", error: error.message });
  }
});

// Penthouse Section
app.post("/api/penthouse", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    console.log("POST /api/penthouse received:", { description, btntext });
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newPenthouse = new Penthouse({ description, btntext });
    await newPenthouse.save();
    console.log("Saved penthouse content:", newPenthouse);
    res.status(201).json({ message: "Penthouse content added successfully", data: newPenthouse });
  } catch (error) {
    console.error("Error saving penthouse content:", error);
    res.status(500).json({ message: "Failed to add penthouse content", error: error.message });
  }
});

app.get("/api/penthouse", async (req, res) => {
  try {
    console.log("GET /api/penthouse called");
    const penthouseContent = await Penthouse.find().sort({ createdAt: -1 }).limit(1).lean();
    console.log("Fetched penthouse content:", penthouseContent);
    res.json(penthouseContent[0] || {});
  } catch (error) {
    console.error("Error fetching penthouse content:", error);
    res.status(500).json({ message: "Failed to fetch penthouse content", error: error.message });
  }
});

app.get("/api/penthouse/featured", async (req, res) => {
  try {
    console.log("GET /api/penthouse/featured called");
    const featured = await PenthouseFeatured.findOne().lean();
    console.log("Fetched penthouse featured:", featured);
    if (!featured || !Array.isArray(featured.references) || !featured.references.length) {
      console.log("No penthouse featured properties found, returning empty array");
      return res.json([]);
    }
    console.log("Fetching properties with references:", featured.references);
    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    }).lean();
    console.log("Found properties:", properties);
    const orderedProperties = featured.references
      .map((ref) => properties.find((prop) => prop.reference === ref))
      .filter((prop) => prop);
    console.log("Returning ordered properties:", orderedProperties);
    res.json(orderedProperties);
  } catch (error) {
    console.error("Error fetching penthouse featured properties:", error.stack);
    res.status(500).json({ message: "Failed to fetch penthouse featured properties", error: error.message });
  }
});

app.post("/api/penthouse/featured", async (req, res) => {
  try {
    console.log("POST /api/penthouse/featured called with:", req.body);
    const { references } = req.body;
    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: "At least one reference number is required" });
    }
    const validReferences = [...new Set(references.filter((ref) => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: "Maximum of four reference numbers allowed" });
    }
    for (const ref of validReferences) {
      const property = await MansionDetail.findOne({ reference: ref }).lean();
      if (!property) {
        return res.status(400).json({ error: `Reference number ${ref} not found` });
      }
    }
    const featured = await PenthouseFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );
    console.log("Saved penthouse featured:", featured);
    res.status(201).json({ message: "Penthouse featured properties saved successfully", data: featured });
  } catch (error) {
    console.error("Error saving penthouse featured properties:", error.stack);
    res.status(500).json({ message: "Failed to save penthouse featured properties", error: error.message });
  }
});

app.get("/api/penthouses", async (req, res) => {
  try {
    console.log("GET /api/penthouses called");
    const penthouses = await Penthouse.find().sort({ createdAt: -1 }).lean();
    res.json(penthouses);
  } catch (error) {
    console.error("Error fetching penthouses:", error);
    res.status(500).json({ message: "Failed to fetch penthouses", error: error.message });
  }
});

app.get("/api/penthouse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/penthouse/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const penthouse = await Penthouse.findById(id).lean();
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json(penthouse);
  } catch (error) {
    console.error("Error fetching penthouse:", error);
    res.status(500).json({ message: "Failed to fetch penthouse", error: error.message });
  }
});

app.put("/api/penthouse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, btntext } = req.body;
    console.log(`PUT /api/penthouse/${id} called with:`, { description, btntext });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const penthouse = await Penthouse.findByIdAndUpdate(
      id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json({ message: "Penthouse updated successfully", data: penthouse });
  } catch (error) {
    console.error("Error updating penthouse:", error);
    res.status(500).json({ message: "Failed to update penthouse", error: error.message });
  }
});

app.delete("/api/penthouse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/penthouse/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const penthouse = await Penthouse.findByIdAndDelete(id);
    if (!penthouse) return res.status(404).json({ message: "Penthouse not found" });
    res.json({ message: "Penthouse deleted successfully" });
  } catch (error) {
    console.error("Error deleting penthouse:", error);
    res.status(500).json({ message: "Failed to delete penthouse", error: error.message });
  }
});

// Collection Section
app.post("/api/collectibles", async (req, res) => {
  try {
    const { description, btntext } = req.body;
    console.log("POST /api/collectibles received:", { description, btntext });
    if (!description || !btntext) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCollection = new Collection({ description, btntext });
    await newCollection.save();
    console.log("Saved collection content:", newCollection);
    res.status(201).json({ message: "Collection added successfully", data: newCollection });
  } catch (error) {
    console.error("Error adding collection:", error);
    res.status(500).json({ message: "Failed to add collection", error: error.message });
  }
});

app.get("/api/collectibles", async (req, res) => {
  try {
    console.log("GET /api/collectibles called");
    const collectionContent = await Collection.find().sort({ createdAt: -1 }).limit(1).lean();
    console.log("Fetched collection content:", collectionContent);
    res.json(collectionContent[0] || {});
  } catch (error) {
    console.error("Error fetching collection content:", error);
    res.status(500).json({ message: "Failed to fetch collection content", error: error.message });
  }
});

app.get("/api/collectibles/featured", async (req, res) => {
  try {
    console.log("GET /api/collectibles/featured called");
    const featured = await CollectiblesFeatured.findOne().lean();
    console.log("Fetched collectibles featured:", featured);
    if (!featured || !Array.isArray(featured.references) || !featured.references.length) {
      console.log("No collectibles featured properties found, returning empty array");
      return res.json([]);
    }
    console.log("Fetching properties with references:", featured.references);
    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    }).lean();
    console.log("Found properties:", properties);
    const orderedProperties = featured.references
      .map((ref) => properties.find((prop) => prop.reference === ref))
      .filter((prop) => prop);
    console.log("Returning ordered properties:", orderedProperties);
    res.json(orderedProperties);
  } catch (error) {
    console.error("Error fetching collectibles featured properties:", error.stack);
    res.status(500).json({ message: "Failed to fetch collectibles featured properties", error: error.message });
  }
});

app.post("/api/collectibles/featured", async (req, res) => {
  try {
    console.log("POST /api/collectibles/featured called with:", req.body);
    const { references } = req.body;
    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: "At least one reference number is required" });
    }
    const validReferences = [...new Set(references.filter((ref) => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: "Maximum of four reference numbers allowed" });
    }
    for (const ref of validReferences) {
      const property = await MansionDetail.findOne({ reference: ref }).lean();
      if (!property) {
        return res.status(400).json({ error: `Reference number ${ref} not found` });
      }
    }
    const featured = await CollectiblesFeatured.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );
    console.log("Saved collectibles featured:", featured);
    res.status(201).json({ message: "Collectibles featured properties saved successfully", data: featured });
  } catch (error) {
    console.error("Error saving collectibles featured properties:", error.stack);
    res.status(500).json({ message: "Failed to save collectibles featured properties", error: error.message });
  }
});

app.get("/api/collections", async (req, res) => {
  try {
    console.log("GET /api/collections called");
    const collections = await Collection.find().sort({ createdAt: -1 }).lean();
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Failed to fetch collections", error: error.message });
  }
});

app.get("/api/collectibles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/collectibles/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const collection = await Collection.findById(id).lean();
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ message: "Failed to fetch collection", error: error.message });
  }
});

app.put("/api/collectibles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, btntext } = req.body;
    console.log(`PUT /api/collectibles/${id} called with:`, { description, btntext });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const collection = await Collection.findByIdAndUpdate(
      id,
      { description, btntext },
      { new: true, runValidators: true }
    );
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json({ message: "Collection updated successfully", data: collection });
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ message: "Failed to update collection", error: error.message });
  }
});

app.delete("/api/collectibles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/collectibles/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const collection = await Collection.findByIdAndDelete(id);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Failed to delete collection", error: error.message });
  }
});

// Magazine Section
app.post("/api/magazine", upload.single("image"), async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    const imagePath = req.file?.path;
    if (!heading || !subheading || !imagePath) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMagazine = new Magazine({ heading, subheading, image: imagePath });
    await newMagazine.save();
    res.status(201).json({ message: "Magazine content added successfully", data: newMagazine });
  } catch (error) {
    console.error("Error saving magazine content:", error);
    res.status(500).json({ message: "Failed to add magazine content", error: error.message });
  }
});

app.get("/api/magazine", async (req, res) => {
  try {
    console.log("GET /api/magazine called");
    const magazineContent = await Magazine.find().sort({ createdAt: -1 }).limit(1).lean();
    res.json(magazineContent[0] || {});
  } catch (error) {
    console.error("Error fetching magazine content:", error);
    res.status(500).json({ message: "Failed to fetch magazine content", error: error.message });
  }
});

app.get("/api/magazines", async (req, res) => {
  try {
    console.log("GET /api/magazines called");
    const magazines = await Magazine.find().sort({ createdAt: -1 }).lean();
    res.json(magazines);
  } catch (error) {
    console.error("Error fetching magazines:", error);
    res.status(500).json({ message: "Failed to fetch magazines", error: error.message });
  }
});

app.get("/api/magazine/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/magazine/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazine = await Magazine.findById(id).lean();
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json(magazine);
  } catch (error) {
    console.error("Error fetching magazine:", error);
    res.status(500).json({ message: "Failed to fetch magazine", error: error.message });
  }
});

app.put("/api/magazine/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, subheading } = req.body;
    const imagePath = req.file?.path;
    console.log(`PUT /api/magazine/${id} called with:`, { heading, subheading });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const updateData = { heading, subheading };
    if (imagePath) updateData.image = imagePath;
    const magazine = await Magazine.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json({ message: "Magazine updated successfully", data: magazine });
  } catch (error) {
    console.error("Error updating magazine:", error);
    res.status(500).json({ message: "Failed to update magazine", error: error.message });
  }
});

app.delete("/api/magazine/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/magazine/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazine = await Magazine.findByIdAndDelete(id);
    if (!magazine) return res.status(404).json({ message: "Magazine not found" });
    res.json({ message: "Magazine deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine:", error);
    res.status(500).json({ message: "Failed to delete magazine", error: error.message });
  }
});

// MansionDetail Section
app.post("/api/propertyDetail", propertyUpload, async (req, res) => {
  try {
    const { reference, ...propertyData } = req.body;
    console.log("POST /api/propertyDetail called with reference:", reference);
    const existingProperty = await MansionDetail.findOne({ reference });
    if (existingProperty) {
      return res.status(400).json({ message: "Property with this reference already exists" });
    }
    const filePaths = {
      image: req.files["image"]?.[0]?.path,
      video: req.files["video"]?.[0]?.path,
      agentimage: req.files["agentimage"]?.[0]?.path,
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
    console.log("Saved property:", newProperty);
    res.status(201).json({ message: "Property saved successfully", data: newProperty });
  } catch (error) {
    console.error("Error saving property:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate reference number" });
    } else {
      res.status(500).json({ message: "Failed to save property", error: error.message });
    }
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    console.log("GET /api/properties called");
    const properties = await MansionDetail.find().sort({ createdAt: -1 }).lean();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Failed to fetch properties", error: error.message });
  }
});

app.get("/api/mansions/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    console.log(`GET /api/mansions/${reference} called`);
    const property = await MansionDetail.findOne({ reference }).lean();
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});

app.get("/api/propertyDetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/propertyDetail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const property = await MansionDetail.findById(id).lean();
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});

app.put("/api/propertyDetail/:id", propertyUpload, async (req, res) => {
  try {
    const { id } = req.params;
    const { reference, ...propertyData } = req.body;
    console.log(`PUT /api/propertyDetail/${id} called with reference:`, reference);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const existingProperty = await MansionDetail.findOne({ reference, _id: { $ne: id } });
    if (existingProperty) {
      return res.status(400).json({ message: "Property with this reference already exists" });
    }
    const filePaths = {
      image: req.files["image"]?.[0]?.path,
      video: req.files["video"]?.[0]?.path,
      agentimage: req.files["agentimage"]?.[0]?.path,
    };
    const updateData = { reference, ...propertyData, ...filePaths };
    Object.keys(filePaths).forEach((key) => {
      if (!filePaths[key]) delete updateData[key];
    });
    const property = await MansionDetail.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated successfully", data: property });
  } catch (error) {
    console.error("Error updating property:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate reference number" });
    } else {
      res.status(500).json({ message: "Failed to update property", error: error.message });
    }
  }
});

app.delete("/api/propertyDetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/propertyDetail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const property = await MansionDetail.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Failed to delete property", error: error.message });
  }
});

// MagazineDetail Section
app.post("/api/magazineDetail", upload.single("mainImage"), async (req, res) => {
  try {
    const { author, title, subtitle, time, content, category } = req.body;
    const mainImage = req.file?.path;
    console.log("POST /api/magazineDetail called with:", { author, title, category });
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
      category,
    });
    await newMagazineDetail.save();
    res.status(201).json({ message: "Magazine article added successfully", data: newMagazineDetail });
  } catch (error) {
    console.error("Error saving magazine article:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: Object.values(error.errors).map((e) => e.message).join(", ") });
    }
    res.status(500).json({ message: "Failed to add magazine article", error: error.message });
  }
});

app.get("/api/magazineDetails", async (req, res) => {
  try {
    console.log("GET /api/magazineDetails called");
    const magazineDetails = await MagazineDetail.find().sort({ createdAt: -1 }).lean();
    res.json(magazineDetails);
  } catch (error) {
    console.error("Error fetching magazine articles:", error);
    res.status(500).json({ message: "Failed to fetch magazine articles", error: error.message });
  }
});

app.get("/api/magazineDetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/magazineDetail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazineDetail = await MagazineDetail.findById(id).lean();
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json(magazineDetail);
  } catch (error) {
    console.error("Error fetching magazine article:", error);
    res.status(500).json({ message: "Failed to fetch magazine article", error: error.message });
  }
});

app.put("/api/magazineDetail/:id", upload.single("mainImage"), async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, subtitle, time, content, category } = req.body;
    const mainImage = req.file?.path;
    console.log(`PUT /api/magazineDetail/${id} called with:`, { author, title, category });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const updateData = { author, title, subtitle, time, content, category };
    if (mainImage) updateData.mainImage = mainImage;
    const magazineDetail = await MagazineDetail.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json({ message: "Magazine article updated successfully", data: magazineDetail });
  } catch (error) {
    console.error("Error updating magazine article:", error);
    res.status(500).json({ message: "Failed to update magazine article", error: error.message });
  }
});

app.delete("/api/magazineDetail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/magazineDetail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazineDetail = await MagazineDetail.findByIdAndDelete(id);
    if (!magazineDetail) return res.status(404).json({ message: "Magazine article not found" });
    res.json({ message: "Magazine article deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine article:", error);
    res.status(500).json({ message: "Failed to delete magazine article", error: error.message });
  }
});

// Newsletter Section
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email, category } = req.body;
    console.log("POST /api/newsletter called with:", { email, category });
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const newNewsletter = new Newsletter({ email, category: category || "Newsletter" });
    await newNewsletter.save();
    res.status(201).json({ message: "Email added to newsletter successfully" });
  } catch (error) {
    console.error("Error adding email to newsletter:", error);
    res.status(500).json({ message: "Failed to add email to newsletter", error: error.message });
  }
});

app.get("/api/newsletter", async (req, res) => {
  try {
    console.log("GET /api/newsletter called");
    const newsletter = await Newsletter.find().sort({ createdAt: -1 }).lean();
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({ message: "Failed to fetch newsletter", error: error.message });
  }
});

app.get("/api/newsletter/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/newsletter/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const newsletter = await Newsletter.findById(id).lean();
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter entry:", error);
    res.status(500).json({ message: "Failed to fetch newsletter entry", error: error.message });
  }
});

app.put("/api/newsletter/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, category } = req.body;
    console.log(`PUT /api/newsletter/${id} called with:`, { email, category });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (!email) return res.status(400).json({ error: "Email is required" });
    const newsletter = await Newsletter.findByIdAndUpdate(
      id,
      { email, category },
      { new: true, runValidators: true }
    );
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json({ message: "Newsletter entry updated successfully", data: newsletter });
  } catch (error) {
    console.error("Error updating newsletter entry:", error);
    res.status(500).json({ message: "Failed to update newsletter entry", error: error.message });
  }
});

app.delete("/api/newsletter/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/newsletter/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const newsletter = await Newsletter.findByIdAndDelete(id);
    if (!newsletter) return res.status(404).json({ message: "Newsletter entry not found" });
    res.json({ message: "Newsletter entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter entry:", error);
    res.status(500).json({ message: "Failed to delete newsletter entry", error: error.message });
  }
});

// MagazineEmail Section
app.post("/api/magazineEmail", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("POST /api/magazineEmail called with:", { email });
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const newMagazineEmail = new MagazineEmail({ email });
    await newMagazineEmail.save();
    res.status(201).json({ message: "Email added to magazine email list successfully" });
  } catch (error) {
    console.error("Error adding email to magazine email list:", error);
    res.status(500).json({ message: "Failed to add email to magazine email list", error: error.message });
  }
});

app.get("/api/magazineEmail", async (req, res) => {
  try {
    console.log("GET /api/magazineEmail called");
    const magazineEmail = await MagazineEmail.find().sort({ createdAt: -1 }).lean();
    res.json(magazineEmail);
  } catch (error) {
    console.error("Error fetching magazine email list:", error);
    res.status(500).json({ message: "Failed to fetch magazine email list", error: error.message });
  }
});

app.get("/api/magazineEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/magazineEmail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazineEmail = await MagazineEmail.findById(id).lean();
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json(magazineEmail);
  } catch (error) {
    console.error("Error fetching magazine email entry:", error);
    res.status(500).json({ message: "Failed to fetch magazine email entry", error: error.message });
  }
});

app.put("/api/magazineEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    console.log(`PUT /api/magazineEmail/${id} called with:`, { email });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (!email) return res.status(400).json({ error: "Email is required" });
    const magazineEmail = await MagazineEmail.findByIdAndUpdate(
      id,
      { email },
      { new: true, runValidators: true }
    );
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json({ message: "Magazine email entry updated successfully", data: magazineEmail });
  } catch (error) {
    console.error("Error updating magazine email entry:", error);
    res.status(500).json({ message: "Failed to update magazine email entry", error: error.message });
  }
});

app.delete("/api/magazineEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/magazineEmail/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const magazineEmail = await MagazineEmail.findByIdAndDelete(id);
    if (!magazineEmail) return res.status(404).json({ message: "Magazine email entry not found" });
    res.json({ message: "Magazine email entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting magazine email entry:", error);
    res.status(500).json({ message: "Failed to delete magazine email entry", error: error.message });
  }
});

// Inquiry Section
app.post("/api/inquiries", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    console.log("POST /api/inquiries called with:", { firstName, lastName, email });
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const newInquiry = new Inquiry({ firstName, lastName, email, phone, message });
    await newInquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully", data: newInquiry });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ message: "Failed to submit inquiry", error: error.message });
  }
});

app.get("/api/inquiries", async (req, res) => {
  try {
    console.log("GET /api/inquiries called");
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Failed to fetch inquiries", error: error.message });
  }
});

app.get("/api/inquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/inquiries/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const inquiry = await Inquiry.findById(id).lean();
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({ message: "Failed to fetch inquiry", error: error.message });
  }
});

app.put("/api/inquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, message } = req.body;
    console.log(`PUT /api/inquiries/${id} called with:`, { firstName, lastName, email });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phone, message },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry updated successfully", data: inquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ message: "Failed to update inquiry", error: error.message });
  }
});

app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/inquiries/${id} called`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ message: "Failed to delete inquiry", error: error.message });
  }
});

// Featured Properties
app.post("/api/featured", async (req, res) => {
  try {
    console.log("POST /api/featured called with:", req.body);
    const { references } = req.body;
    if (!references || !Array.isArray(references) || references.length === 0) {
      return res.status(400).json({ error: "At least one reference number is required" });
    }
    const validReferences = [...new Set(references.filter((ref) => ref))];
    if (validReferences.length > 4) {
      return res.status(400).json({ error: "Maximum of four reference numbers allowed" });
    }
    for (const ref of validReferences) {
      const property = await MansionDetail.findOne({ reference: ref }).lean();
      if (!property) {
        return res.status(400).json({ error: `Reference number ${ref} not found` });
      }
    }
    const featured = await FeaturedProperties.findOneAndUpdate(
      {},
      { references: validReferences },
      { upsert: true, new: true, runValidators: true }
    );
    console.log("Saved featured properties:", featured);
    res.status(201).json({ message: "Featured properties saved successfully", data: featured });
  } catch (error) {
    console.error("Error saving featured properties:", error.stack);
    res.status(500).json({ message: "Failed to save featured properties", error: error.message });
  }
});

app.get("/api/featured", async (req, res) => {
  try {
    console.log("GET /api/featured called");
    const featured = await FeaturedProperties.findOne().lean();
    console.log("Fetched featured:", featured);
    if (!featured || !Array.isArray(featured.references) || !featured.references.length) {
      console.log("No featured properties found, returning empty array");
      return res.json([]);
    }
    console.log("Fetching properties with references:", featured.references);
    const properties = await MansionDetail.find({
      reference: { $in: featured.references },
    }).lean();
    console.log("Found properties:", properties);
    const orderedProperties = featured.references
      .map((ref) => properties.find((prop) => prop.reference === ref))
      .filter((prop) => prop);
    console.log("Returning ordered properties:", orderedProperties);
    res.json(orderedProperties);
  } catch (error) {
    console.error("Error fetching featured properties:", error.stack);
    res.status(500).json({ message: "Failed to fetch featured properties", error: error.message });
  }
});

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", mongodb: mongoose.connection.readyState });
});

// Server startup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Environment variables:", {
    MONGO_URI: process.env.MONGO_URI ? "Set" : "Missing",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing",
    JWT_SECRET: process.env.JWT_SECRET ? "Set" : "Missing",
  });
});