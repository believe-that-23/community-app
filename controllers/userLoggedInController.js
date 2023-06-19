const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const snowflake = require('@theinternetfolks/snowflake');
const {Snowflake} = snowflake;




const User = require("../model/user.model");

const newId = new mongoose.Types.ObjectId();

const userLoggedIn = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json({ message: " Invalid email provided" });
    
    const { password, ...rest } = user._doc;

    if (token) {
      res.json({ ...rest });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = userLoggedIn;
