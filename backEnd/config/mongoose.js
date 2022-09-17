const mongoose = require ('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://umeaemun:umeaemun18@messaging-app.wawdwmy.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection

db.on('error',()=>{
    console.log('error in connecting to db')
})

db.once('open',()=>{
    console.log('successfully connected to database')
})

module.exports = mongoose