const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/community';

const connectDB = async () => {
    try {
        await mongoose.connect( dbUrl, {
            useUnifiedTopology : true ,
            useNewUrlParser : true
        })
    } catch (error) {
        console.log(error);
    }    
}

module.exports = connectDB;