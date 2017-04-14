'use strict';

const User = require('../models/userModel')
const {knex} = require('../db/database')
const Dislike = () => knex('dislikes')
const Like = () => knex('likes')

// gets all likes from likes table
const getLikes = () =>
  Like().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

// gets all dislikes from dislikes table
const getDislikes = () =>
  Dislike().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

// gets all likes and dislikes and passes them into the profile page when rendering
module.exports.show = (req, res, err) =>
  Promise.all([getLikes(), getDislikes()])
  .then(([likes, dislikes]) =>
    res.render('profile', {page: 'Profile', likes, dislikes})
  ).catch(err)

// method for creating a user profile
module.exports.create = (req, res, err) => {
  const likes = req.body.likes
  const dislikes = req.body.dislikes
  // makes sure likes and dislikes are arrays
  req.body.likes = likes && typeof(likes) === 'string' ? [likes] : likes
  req.body.dislikes = dislikes && typeof(dislikes) === 'string' ? [dislikes] : dislikes
  // sets photo based on gender
  if (req.body.gender === 'female') {
    req.body.photo =  "/images/girl.jpeg"
  }
  else {
    req.body.photo = '/images/male.png'
  }
  // sets username on body object to be the same as the username on session object
  req.body.username = req.session.username
  // sets username variable for "where" below
  let username = req.session.username
  // instantiates user
  User.forge(req.body)
  // need this to tell bookshelf to update
  .where({username: username})
  // need to tell bookshelf everything you want saved and the method to use
  .save({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, gender: req.body.gender, city: req.body.city, state: req.body.state, phone: req.body.phone, likes: req.body.likes, dislikes: req.body.dislikes, photo: req.body.photo}, {method: 'update'})
  .then((profileObj) => {
    req.flash('profileMsg', 'Thank you for joining!')
    res.redirect('/')
  })
  .catch((err) => {
    console.log('Profile creation did not work.',err)
    Promise.all([
      Promise.resolve(err),
      getDislikes(),
      getLikes()
    ])
    .then(([errors, dislikes, likes]) => {
      let body = req.body
      return res.render('profile', {page: 'Profile', dislikes, likes, errors, body})
    })
  })
  .catch(err)
}
