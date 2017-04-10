
const users = require('./mock_users')

exports.seed = function(knex, Promise) {

  let userPromises = users.map(({username, password, first_name, last_name, gender, city, state, phone, email, photo, likes, dislikes, likedUsers}) => {
    return knex('users').insert({userName: username, password: password, firstName: first_name, lastName: last_name, city: city, state: state, phone: phone, email: email, photo: photo, gender: gender, likedUsers: likedUsers, likes: likes, dislikes: dislikes })
  })
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(userPromises)
    });
};