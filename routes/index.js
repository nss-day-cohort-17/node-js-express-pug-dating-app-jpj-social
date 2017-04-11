'use strict'

const { Router } = require('express')
const router = Router()


//public routes

router.use('./home-route')
router.use('./register')
router.use('./logout')

module.exports = router;
