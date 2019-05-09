const router = require("express").Router();

const Recipes = require("./recipe-model");

router.get("/", (req, res) => {
  Recipes.getRecipes()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error retrieving the recipe" });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const recipes = await Recipes.getRecipe(req.params.id);
    if (recipes) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: "We could find the recipe" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the recipe" });
  }
});

router.post("/", async (req, res) => {
  const recipe = req.body;
  if (recipe.name) {
    try {
      const inserted = await Recipes.addRecipe(recipe);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating the recipe" });
    }
  } else {
    res.status(400).json({ message: "Please provide name of the recipe" });
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;

  if (changes.name) {
    try {
      const updated = await Recipes.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: "The recipe does not exist"
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating the recipe" });
    }
  } else {
    res.status(400).json({
      message: "Please provide the name of the recipe"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dishes = await Recipes.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The recipe does not exist"
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing the recipe" });
  }
});

module.exports = router;
