`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  User.getAllUsers()
  .then(users => {
    users = users.toJSON()
    req.session.fromReg = false
    res.render('index', {page: 'Home', users})
  })
}

module.exports.create = (req,res,next) => {
  User.findOneByUserName(req.session.username)
  .then (users => {
    users = users.toJSON();
    // User.getAllLikedUsers(req.session.username)
    // .then((user)=>{
    //   // let likedUserArray = user
    //   console.log("likedUserArray",user);
      if (!users.likedusers) {
         users.likedusers = [req.body.likedusers]
      //   // req.body.likedusers = likedusers && typeof(likedusers) === 'string' ? [likedusers] : likedusers
      //   likedUserArray = [req.body.likedusers]
    } else if (users.likedusers.length === 0) {
        users.likedusers = [req.body.likedusers]

      } else {
        users.likedusers.push(req.body.likedusers)
      }
       User.forge(req.body).where({username: req.session.username})
       .save({likedusers: users.likedusers}, {method: 'update'})
       .then(console.log("im saved"))
    } )
}
