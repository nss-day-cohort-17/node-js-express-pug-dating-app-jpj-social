'use strict'

const { Router } = require('express')
const router = Router()

//public routes

router.use(require('./home-route'))
router.use(require('./register-route'))
router.use(require('./logout-route'))
router.use(require('./login-route'))

//login guard middleware - sends user home if not registered
router.use((req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})


// private routes
router.use(require('./logout-route'))
router.use(require('./profile-route'))
module.exports = router;
