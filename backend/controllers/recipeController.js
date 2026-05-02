const axios = require("axios");
require("dotenv").config();

exports.getRecipes = async (req, res) => {
  const { ingredients } = req.query;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients,
          number: 6,
          apiKey: process.env.SPOON_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Missing recipe id" });

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOON_API_KEY,
          includeNutrition: false,
        },
      }
    );

    // response.data includes: title, image, sourceUrl, instructions, analyzedInstructions, readyInMinutes, servings, etc.
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe info:", error.message || error);
    const status = (error.response && error.response.status) || 500;
    res.status(status).json({ message: "Error fetching recipe details" });
  }
};


//controller