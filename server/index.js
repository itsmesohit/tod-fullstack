const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

app.use(cors());


connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})