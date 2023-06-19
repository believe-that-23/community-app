const Role = require('../model/role.model')

const roleHandler = async (req, res) => {
    const { name } = req.body;
    const id = req.body.user.id;
    try {
        const role = await Role.create({ id, role: name });
        res.status(200).json({ name });
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const viewRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json({ roles });
    } catch (error) {
        console.error('error showing roles', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { roleHandler, viewRoles };