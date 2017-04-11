`use strict`

// show method renders index page
module.exports.show = (req, res, next) => {
  res.render('index', {page: 'Home'})
}
