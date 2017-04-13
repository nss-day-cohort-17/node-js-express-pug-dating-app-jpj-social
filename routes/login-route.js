'use strict';

const { Router } = require('express')

const user = require('../controllers/sessionCtrl')

const router = Router()

router.get('/login', user.show)
router.post('/login', user.create)

module.exports = router
