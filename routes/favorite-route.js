'use strict'

const { Router } = require('express');
const { show } = require('../controllers/favoriteCtrl')

const router = Router()

router.get('/favorite', show)

module.exports = router
