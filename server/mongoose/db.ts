const mongoose = require('mongoose')
import { port } from '../../bin/www'

const connectDB = async () => {
    try {
        console.log('Here:',process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected to ${port}`)

    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}