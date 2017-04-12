`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  User.getAllLikedUsers()
    .then((users) => {
      console.log("users",users[0].likedusers);
      let userPromise = users[0].likedusers
      userPromise = userPromise.map(id =>{
        return User.forge({id : id}).fetch()
      })
      Promise.all(userPromise)
      .then ((likedUserArr) =>{
        console.log(likedUserArr)
        res.render('favorite', {page: 'Favorites', likedUserArr})
      })

    })
}
