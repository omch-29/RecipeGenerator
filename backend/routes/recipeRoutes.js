const express = require("express");
const { getRecipes } = require("../controllers/recipeController");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

router.get("/", getRecipes);
router.get("/info/:id", recipeController.getRecipeById);
module.exports = router;
