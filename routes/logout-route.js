'use strict';

const { Router } = require('express');

const { edit, destroy } = require('../controllers/sessionCtrl');

const router = Router();

router.get('/logout', edit);
router.post('/logout', destroy);

module.exports = router;
