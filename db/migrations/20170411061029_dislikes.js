
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('dislikes', (t)=>{
      t.increments()
      t.string('name').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('dislikes')
};
