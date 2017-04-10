`use strict`

const passport = require('passport')
const {Strategy} = require('passport-local')
const {knex} = require("../db/database")

const User = require('../models/userModel')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  knex('customers').where({id}).first()
  .then((user) => done(null, user))
  .catch(() => done(err, null))
})

const localStrategy = new Strategy(
  {
    usernameField: 'userName',
    passwordField: 'password'
  },
  (userName, passwordStr, done) => {
    User.findOneByUserName(userName)
    .then((user) => {
      if (user) {
        return Promise.all([
          user,
          user.comparePass(passwordStr)
        ])
      }
      done(null, null, {msg: 'User name does not exist in our system'})
    })
    .then(([user, matches]) => {
      if(matches) {
        done(null, user, {msg: 'Successfully logged in'})
      } else {
        done(null, null, {msg: 'Password does not match.'})
      }
    })
    .catch(done)
  }
)

passport.use(localStrategy)
