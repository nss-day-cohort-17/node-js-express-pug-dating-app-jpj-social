'use strict';

const User = require('../models/userModel')

const getLikes = () =>
  Likes().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

const getDislikes = () =>
  Dislikes().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

module.exports.show = (req, res, err) =>
  Promise.all([getLikes(), getDislikes()])
  .then(([likes, dislikes]) =>
    res.render('profile', {page: 'Profile', likes, dislikes})
  ).catch(err)

module.exports.create = (req, res, err) => {
  // console.log('body', req.body)
  const likes = req.body.likes
  const dislikes = req.body.dislikes
  req.body.likes = likes && typeof(likes) === 'string' ? [likes] : likes
  req.body.dislikes = dislikes && typeof(dislikes) === 'string' ? [dislikes] : dislikes
  Order.forge(req.body)
  .save()
  .then((profileObj) => {
    req.flash('profileMsg', 'Thank you for joining!')
    res.redirect('/')
  })
  .catch((err) => {
    console.log('profile creation did not work')
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
