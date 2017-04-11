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
  findOneByUserName: function (email) {
    return this.forge({email})
    .fetch()
    .then( (user) => {
      console.log("Got User", user.get('email'));
      return user;
    })
    .catch( () => {
      console.log("yup, this happens when no email");
      return (null)
    });
  },
    getAllUsers: function () {
      return this.forge().fetchAll()
      .then(users => users)
      .catch(() => null)
    }
});

module.exports = User;

