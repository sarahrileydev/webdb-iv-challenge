const db = require("../data/dbConfig");

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  update,
  remove
};

function getRecipes() {
  return db("recipes")
    .join("dishes", "recipes.dish_id", "=", "dishes.id")
    .select("recipes.id", "recipes.name", "recipes.instructions", {
      dish: "dishes.name"
    });
}

function getRecipe(id) {
  return db("recipes")
    .where({ "recipes.dish_id":id })
    .first()
    .join("dishes", "recipes.dish_id", "=", "dishes.id")
    .select("recipes.id", "recipes.name", "recipes.instructions", {
      dish: "dishes.name"
    });
}

function addRecipe(recipe) {
  return db("recipes")
    .insert(recipe, "id")
    .then(([id]) => {
      return getRecipe(id);
    });
}

function update(id, changes) {
  return db("recipes")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getRecipe(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("recipes")
    .where({ id })
    .del();
}