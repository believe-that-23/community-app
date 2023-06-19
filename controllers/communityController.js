const Community = require('../model/community.model');
const Member = require('../model/member.model');
const Role = require('../model/role.model');
const snowflake = require('@theinternetfolks/snowflake');
const { Snowflake } = snowflake;

const generateSlug = (name) => {
    return name.toLowerCase();
};


// Get all communities
exports.getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving communities' });
    }
};

// Create a community
exports.createCommunity = async (req, res) => {
    const user = req.body.user;
    const { name } = req.body;

    try {
        let newId = Snowflake.generate();
        const community = await Community.create({
            id: newId,
            name,
            slug: generateSlug(name),
            owner: user.id
        });

        newId = Snowflake.generate();
        const role = await Role.create({
            id: newId, user: user.id, role: 'owner'
        })

        newId = Snowflake.generate();
        const member = await Member.create({
            id: newId,
            community: community._id,
            user: user._id,
            role: role._id,
        });

        res.status(201).json(community);
    } catch (err) {
        res.status(500).json({ message: 'Error creating community' });
    }
};

// Get all community members
exports.getAllMembers = async (req, res) => {
    const communityId = req.params.id;
    const com = await Community.find({ id: communityId });

    try {
        const members = [];
        for (let i = 0; i < com.length; i++) {
            const member = await Member.find({ community: com[i]._id }).populate('role');
            members.push(member);
        }
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving members' });
    }
};


// Get owned communities
exports.getMyOwnedCommunities = async (req, res) => {
    const memberId = req.body.user._id;

    try {
        const memberCommunities = await Member.find({ user: memberId }).populate('role');
        const communities = memberCommunities.filter((member) => member.role.role == 'owner');
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving owned communities' });
    }
};

// Get joined communities
exports.getMyJoinedCommunities = async (req, res) => {
    const memberId = req.body.user._id;

    try {
        const memberCommunities = await Member.find({ user: memberId }).populate('role');
        const communities = memberCommunities.filter((member) => member.role.role == 'member');
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving joined communities' });
    }
};



