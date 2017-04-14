'use strict'

const { bookshelf } = require('../db/database');

const Like = bookshelf.Model.extend({
  table: 'likes',
  findOneByLikeId: function (id) {
    return this.forge().query({where: {id: id}}).fetch()
    .then(likes => {
      console.log('likes',likes)
      return likes.toJSON()

    })
    .catch(() => null)
  }
})

module.exports = Like;
