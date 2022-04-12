const mongoose = require('mongoose');

const dbConnect = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
}

module.exports = dbConnect ; 