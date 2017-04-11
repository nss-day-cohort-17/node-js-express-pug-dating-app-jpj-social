'use strict'

const { Router } = require('express');
const { show } = require('../controllers/homeCtrl')

const router = Router()

router.get('/', show)

module.exports = router
