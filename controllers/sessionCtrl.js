'use strict'

const passport = require('passport');

// show method to render login page
module.exports.show = (req, res) => res.render('login', {page: 'Login'});

// create method runs authentication and sends user to home if logged in
module.exports.create = (req, res, next) =>
  passport.authenticate('local', (err, user, msg) => {
    // console.log(user)
    if(err) return next(err)
      console.log("1st err", user)
    // when not logged in go back to login
    if(!user)
      // return res.render('login', {page: 'Login'}, msg)
      console.log("msg",msg);
    // when logged in redirect to home
    req.login(user, (err) => {
      if(err) return next(err)
        console.log("error",err)
      res.redirect('/')
    })
  })(req, res, next)

// renders logout page
module.exports.edit = (req, res, next) =>
  res.render('logout', {page: 'Logout'})

// logs out user and redirects to login page
module.exports.destroy = (req, res, next) => {
  req.logout()
  res.redirect('/login')
}
