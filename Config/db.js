const moongoose = require('mongoose')
const connect = moongoose.connect(process.env.MONGODB_URL)
module.exports = connect