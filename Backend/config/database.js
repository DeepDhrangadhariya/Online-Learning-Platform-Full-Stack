const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.once("open", () => {
    try {
        console.log("DataBase Connected")
    } catch (error) {
        console.log("DataBase Connection Error, ", error)
    }
})

module.exports = db