
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, name: 'smoothie', instructions: 'bananas and milk', dish_id:'1'},
        {id: 2, name: 'salad', instructions: 'greens with dressing', dish_id:'2'}
      ]);
    });
};
