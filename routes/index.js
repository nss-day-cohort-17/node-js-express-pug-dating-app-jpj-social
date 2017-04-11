'use strict'

const { Router } = require('express')
const router = Router()


//public routes

router.use('./home-route')
router.use('./register-route')
router.use('./logout-route')

module.exports = router;
