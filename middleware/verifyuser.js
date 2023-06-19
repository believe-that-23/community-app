const jwt = require('jsonwebtoken');
const User = require('../model/user.model')


module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.PASSWORD_SERET_KEY);
            const { username } = user;
            req.body.user = await User.findOne({ username });
            next();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    if (!token) {
        res.status(401).json({ msg: "not authorised" });
    }
}