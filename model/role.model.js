const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        id : {type : String , required : true},
        user: {type: String, required: true},
        role: {type : String , required : true},
    },
    {
        timestamps: true
    }
)

const Role = mongoose.model("Role" , roleSchema);

module.exports = Role ;