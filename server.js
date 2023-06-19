const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();



const connectDB = require("./config/dbconfig");

const app = express();

app.use(cors());

app.use(express.json());
connectDB();

const PORT = 8000;
const authRoutes = require('./routes/auth.router');
const communityRoutes = require('./routes/community.router');
// const memberRoutes = require('./routes/member.router');
const roleRoutes = require('./routes/role.router');


app.use('/v1/auth', authRoutes);
app.use('/v1/community', communityRoutes);
// app.use('/v1/member', memberRoutes);
app.use('/v1/role', roleRoutes);

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}`)
    }) 
})

