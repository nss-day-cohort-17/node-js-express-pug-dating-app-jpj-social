`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  User.getAllUsers()
  .then(users => {
    users = users.toJSON()
    res.render('index', {page: 'Home', users})
  })
}

module.exports.create = (req,res,next) => {
  console.log("req.session.username",req.session.username);
  console.log("req.body",req.body.likedusers);
  User.findOneByUserName(req.session.username)
  .then (users => {
    users = users.toJSON();
    console.log("usersFROMLIKEUSER",users.likedusers);
    // User.getAllLikedUsers(req.session.username)
    // .then((user)=>{
    //   // let likedUserArray = user
    //   console.log("likedUserArray",user);
      if (users.likedusers.length === 0) {
         users.likedusers = [req.body.likedusers]
      //   // req.body.likedusers = likedusers && typeof(likedusers) === 'string' ? [likedusers] : likedusers
      //   likedUserArray = [req.body.likedusers]
      //   console.log("likedUserArray1",likedUserArray);
      } else {
      //   console.log("likedUserArrayAbove",likedUserArray);
       users.likedusers.push(req.body.likedusers)
        // console.log("likedUserArray2",likedUserArray);
      }
      // console.log("req.session.user",req.session.username);
      console.log("updatedUsers",users);
       User.forge(req.body).where({username: req.session.username})
       .save({likedusers: users.likedusers}, {method: 'update'})
       .then(console.log("im saved"))
    } )

    // likedArray = users.likedusers
    // console.log("users",likedArray);
  // })
}
