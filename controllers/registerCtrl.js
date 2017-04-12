'use strict';

const User = require('../models/userModel')
const passport = require('passport');

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
        passport.authenticate('local', (err, user, msg) => {
            if(err) return next(err)
            // when not logged in go back to login
            if(!user) return res.render('register', {page: 'Register'}, msg)
            // when logged in redirect to home
            register(user, (err) => {
              if(err) return next(err)
              res.redirect('/profile')
            })
          })({body: {username, password, confirmation}}, res, next)
        // res.redirect('/profile')
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
