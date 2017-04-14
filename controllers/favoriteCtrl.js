`use strict`

const User = require('../models/userModel')


// show method renders index page
module.exports.show = (req, res, next) => {
  // console.log("sessions.username",username);
  User.findOneByUserName(req.session.username)
    .then((users) => {
      users = users.toJSON()
      let userPromise = users.likedusers
      if (!userPromise) res.render('favorite', { page: 'Favorites', msg: 'No users liked yet'})

      userPromise = userPromise.map(id =>{
        return User.forge({id : id}).fetch()
      })
      Promise.all(userPromise)
      .then ((likedUserArr) =>{
        res.render('favorite', {page: 'Favorites', likedUserArr})
      })

    })
}
