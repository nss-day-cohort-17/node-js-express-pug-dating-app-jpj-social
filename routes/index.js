'use strict'

const { Router } = require('express')
const router = Router()

//public routes

router.use('./home-route')
router.use('./register-route')
router.use(require('./login-route'))





// private routes
router.use(require('./logout-route'))


module.exports = router;
