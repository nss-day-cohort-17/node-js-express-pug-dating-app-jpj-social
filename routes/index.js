'use strict'

const { Router } = require('express')
const router = Router()


//public routes

router.use(require('./home-route'))
router.use(require('./register-route'))
router.use(require('./logout-route'))

module.exports = router;
