'use strict';

const User = require('../models/userModel')

module.exports.show = (req, res) => {
  res.render('register', { page: 'Register'});
}

module.exports.create = ({body: {username, password, confirmation}}, res) => {
  if (password === confirmation) {
    console.log(username,password)
    User.findOneByUserName(username)
    .then( (user) => {
      if (user) return res.render('register', { msg: 'user is already registered'});
      return User.forge({username, password})
      .save()
      .then( () => {
        res.redirect('/profile')
      })
      // catch for save()
      .catch( (err) => res.render('register', {msg: `Dang1. There was probz. Try again.${err}`}));
    })
    // catch for findOneByEmail
    .catch( (err) => res.render('register', {msg: "Dang2. There was probz. Try again."}));
  } else {
    res.render('register', { msg: 'Oops. Password and confirmation don\'t match. Try again'});
  }
}
