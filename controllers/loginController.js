const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../model/user.model');

const loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email});
        !user && res.status(401).json({message : " Invalid email provided"});
        
        const decodedPassword = CryptoJS.AES.decrypt(user.password , process.env.PASSWORD_SERET_KEY).toString(CryptoJS.enc.Utf8);
        
        decodedPassword !== req.body.password && res.status(401).json({message : " Incorrect password"});

        const {password, ...rest} = user._doc;
        const accessToken = jwt.sign( { username: user.username }, process.env.PASSWORD_SERET_KEY);

        res.json({...rest , accessToken});
    } catch (error) {
        console.log(error);
    }
}

module.exports = loginHandler;