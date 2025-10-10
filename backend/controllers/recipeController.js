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
