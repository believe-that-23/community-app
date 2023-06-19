const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        id : {type : String , required : true},
        username: {type : String , required : true , min : 2},
        email:{type : String , required: true , unique : true},
        password: {type : String , required : true , min : 6},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User" , userSchema);

module.exports = User ;