'use strict'

const { Router } = require('express');
const { show, create } = require('../controllers/profileCtrl')

const router = Router()

router.get('/profile', show)
router.post('/profile', create)
module.exports = router
