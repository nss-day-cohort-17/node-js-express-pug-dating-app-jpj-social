`use strict`

module.exports.show = (req, res, next) => {
  res.render('index', {page: 'Home'})
}
