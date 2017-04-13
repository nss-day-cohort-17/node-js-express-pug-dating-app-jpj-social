'use strict';

const User = require('../models/userModel')
const passport = require('passport');

// method called when GETting on register page
module.exports.show = (req, res) => {
  res.render('register', { page: 'Register'});
}

module.exports.create = ({body: {username, password, confirmation}}, res) => {
  if (password === confirmation) {
    User.findOneByUserName(username)
    .then( (user) => {
      if (user) return res.render('register', { msg: 'user is already registered'});
      return User.forge({username, password})
      .save()
      .then( () => {
        res.redirect('/profile')
      })
      // catch for save()
      .catch( (err) => res.render('register', {msg: `Save failed. ${err}`}));
    })
    // catch for findOneByEmail
    .catch( (err) => res.render('register', {msg: "find username failed."}));
  } else {
    res.render('register', { msg: 'Oops. Password and confirmation don\'t match. Try again'});
  }
}
