
const likes = require('./MOCK_likes')

exports.seed = function(knex, Promise) {

  let likePromises = likes.map(({name}) => {
    return knex('likes').insert({name: name})
  })
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(likePromises)
    });
};
