'use strict'

const { bookshelf } = require('../db/database');
const { compare } = require('bcryptjs');

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password'},
  comparePass: function (passwordStr) {
    return compare(passwordStr, this.attributes.password)
  }
}, {
  findOneByUserName: function (username) {
    return this.forge({username})
    .fetch()
    .then( (user) => {
      return user;
    })
    .catch( () => {
      return (null)
    });
  },
    getAllUsers: function () {
      return this.forge().fetchAll()
      .then(users => users)
      .catch(() => null)
    },
    getAllLikedUsers: function (username) {
      return this.forge().query({where: {username:{username}}}).fetchAll()
      .then(users => users.toJSON())
      .catch(() => null)
    }
    ,
    likeUser: function (username){
      return this.forge().query({where: {username: username}}).fetch()
      .then(users => {return users.toJSON()})
      .catch(() => null)
    }
});

module.exports = User;

