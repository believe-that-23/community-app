const Community = require('../model/community.model');
const Member = require('../model/member.model');
const Role = require('../model/role.model');
const snowflake = require('@theinternetfolks/snowflake');
const { Snowflake } = snowflake;

const generateSlug = (name) => {
    return name.toLowerCase();
};

exports.addMember = async (req, res) => {
  const { comm, user_req, role } = req.body;
  const user = req.body.user;

  try {
    const admin = await Member.find({ user: user._id }).populate('role');
    if (admin.role.role != 'admin' || admin.role.role != 'owner') {
      return res.status(403).json({ message: 'NOT_ALLOWED_ACCESS' });
    }

    // Create a new member record
    let newId = Snowflake.generate();
        const community = await Community.create({
            id: newId,
            name: comm,
            slug: generateSlug(comm),
            owner: user.id
        });

        newId = Snowflake.generate();
        const role = await Role.create({
            id: newId, user: user_req, role: 'member'
        })

        newId = Snowflake.generate();
        const member = await Member.create({
            id: newId,
            community: community._id,
            user: user._id,
            role: role._id,
        });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding member' });
  }
};
