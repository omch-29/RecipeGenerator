const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();
console.log("Loaded key:", process.env.SPOON_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/recipes", recipeRoutes);

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));