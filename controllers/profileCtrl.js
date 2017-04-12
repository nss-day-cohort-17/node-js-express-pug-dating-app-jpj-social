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
  req.body.likes = likes && typeof(likes) === 'string' ? [likes] : likes
  req.body.dislikes = dislikes && typeof(dislikes) === 'string' ? [dislikes] : dislikes
  console.log("likes",likes);
  console.log("req.body",req.body);
  User.forge(req.body)
  .save()
  .then((profileObj) => {
    req.flash('profileMsg', 'Thank you for joining!')
    res.redirect('/')
  })
  .catch((err) => {
    console.log('profile creation did not work',err)
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
