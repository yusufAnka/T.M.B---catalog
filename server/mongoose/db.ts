const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log('Here:',process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        

    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}