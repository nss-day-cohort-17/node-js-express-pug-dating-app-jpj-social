'use strict'

const { Router } = require('express');
const { show, create } = require('../controllers/homeCtrl')

const router = Router()

router.get('/', show)
router.post('/', create)
module.exports = router
