import mongoose from "mongoose"

function dbConnect() {
    mongoose.connect('mongodb://localhost:27017/carxinno').then(() => {
        console.log("db connected")
    }).catch(err => {
        console.log(err)
    })
}
export default dbConnect