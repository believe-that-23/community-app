const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyuser')

const {roleHandler, viewRoles} = require('../controllers/roleController');

router.route("/")
    .post(verifyUser, roleHandler);

router.route("/")
    .get(verifyUser, viewRoles)

module.exports = router;
