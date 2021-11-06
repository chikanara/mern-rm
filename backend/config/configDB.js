const mongoose = require("mongoose")

const configDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected")
    } catch (error) {
        console.error(error)
    }
}
module.exports= configDB