const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// POST /v1/member
router.post('/', verifyUser, memberController.addMember);

module.exports = router;