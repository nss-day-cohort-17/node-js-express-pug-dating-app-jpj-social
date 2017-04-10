`use strict`

const environment = process.env.NODE_ENV || 'development'

const config = require(`../knexfile`)[environment]
const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

//hashes user passwords
bookshelf.plugin(require('bookshelf-bcrypt'))

module.exports = {knex, bookshelf}
