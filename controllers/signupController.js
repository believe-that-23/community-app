const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const snowflake = require('@theinternetfolks/snowflake');
const {Snowflake} = snowflake;

const User = require('../model/user.model');

const newId = Snowflake.generate();


const signupHandler = async (req, res)=>{
    try {
        const newUser = new User({
            id : newId,
            username : req.body.username,
            email : req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password , process.env.PASSWORD_SERET_KEY).toString()
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({message : "Error creating a user"})
    }
}

module.exports = signupHandler ;