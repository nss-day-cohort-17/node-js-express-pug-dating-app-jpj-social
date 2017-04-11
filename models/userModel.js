'use strict'

const { bookshelf } = require('../db/database');
const { compare } = require('bcryptjs');

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password'},
  comparePass: function (passwordStr) {
    console.log("password String from user", passwordStr );
    console.log("user", this.attributes);
    return compare(passwordStr, this.attributes.password)
  }
}, {
  findOneByUserName: function (username) {
    return this.forge({username})
    .fetch()
    .then( (user) => {
      console.log("Got User", user.get('username'));
      return user;
    })
    .catch( () => {
      console.log("Username not found");
      return (null)
    });
  }
});

module.exports = User;
