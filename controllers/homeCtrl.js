`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  User.getAllUsers()
  .then(users => {
    users = users.toJSON()
    res.render('index', {page: 'Home', users})
  })
  
}
