exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes_ingredients", tbl => {
   
    tbl.increments();

    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("ingredient_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recipes_ingredients");
};
