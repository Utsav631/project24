const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    const mongoUrl = "mongodb+srv://12212034:631631@cluster0.isenn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    if (!mongoUrl) {
        console.error("MongoDB URL is undefined. Check your .env file.");
        process.exit(1);
    }

    mongoose.connect(mongoUrl)
    .then(() => { 
        console.log("Connection successful");
    })
    .catch((error) => { 
        console.log("Hello");
        console.error("Connection error:", error.message);
        process.exit(1);
    });
}

module.exports = dbConnect;