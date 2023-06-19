const express = require('express');
const router = express.Router();

const verifyUser = require('../middleware/verifyuser')
const communityController = require('../controllers/communityController');

// Create a community
router.route('/')
    .post(verifyUser, communityController.createCommunity);

// Get all communities
router.route('/')
    .get(verifyUser, communityController.getAllCommunities);

// Get all members of a community
router.route('/:id/members')
    .get(communityController.getAllMembers);

// Get owned communities of the signed-in user
router.route('/me/owner')
    .get(verifyUser, communityController.getMyOwnedCommunities);

// Get joined communities of the signed-in user
router.route('/me/member')
    .get(verifyUser, communityController.getMyJoinedCommunities);

module.exports = router;
