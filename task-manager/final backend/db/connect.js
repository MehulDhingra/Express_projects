const moongoose = require("mongoose");

const connectDB = (url) =>{
    return moongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
} )
}

module.exports = connectDB


   