const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
    {
        id : {type : String , required : true},
        name: {type : String , required : true , min : 2},
        slug: {type : String , required : true , unique : true},
        owner: {
            type: String,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const Community = mongoose.model("Community" , communitySchema);

module.exports = Community ;