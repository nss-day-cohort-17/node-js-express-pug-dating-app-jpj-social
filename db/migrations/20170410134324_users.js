
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users',(t)=>{
      t.increments()
      t.string('username').unique()
      t.string('password')
      t.string('firstname')
      t.string('lastname')
      t.string('city')
      t.string('state')
      t.string('phone')
      t.string('email')
      t.string('photo')
      t.string('gender')
      t.specificType('likedusers', knex.raw('text[]'))
      t.specificType('likes', knex.raw('text[]')).notNullable()
      t.specificType('dislikes', knex.raw('text[]')).notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('users')
};
