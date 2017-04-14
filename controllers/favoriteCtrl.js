`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  // console.log("sessions.username",username);
  User.getAllLikedUsers(req.session.user)
  .then((users) => {
    // console.log("users",users[0].likedusers);
    let userPromise = users[0].likedusers
    userPromise = userPromise.map(id =>{
      return User.forge({id : id}).fetch()
    })
    Promise.all(userPromise)
    .then ((likedUserArr) =>{
      req.session.fromReg = false
      res.render('favorite', {page: 'Favorites', likedUserArr})
    })
  })
}
