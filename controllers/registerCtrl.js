'use strict';

const User = require('../models/userModel')
const passport = require('passport');

// method called when GETting on register page
module.exports.show = (req, res) => {
  res.render('register', { page: 'Register'});
}

// method called when POSTing on register page
module.exports.create = (req, res) => {
  // didn't destructure so the req object would be available down in the 2nd .then() for the redirect
  const username = req.body.username
  const password = req.body.password
  const confirmation = req.body.confirmation
  // checks to see if password and password confirmation are the same
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
