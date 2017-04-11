

const dislikes = require('./MOCK_dislikes')

exports.seed = function(knex, Promise) {

  let dislikePromises = dislikes.map(({name}) => {
    return knex('dislikes').insert({name: name})
  })
  // Deletes ALL existing entries
  return knex('dislikes').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(dislikePromises)
    });
};
