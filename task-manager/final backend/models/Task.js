const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'must provide username'],
        trim: true,
        maxlength: [20, "can't be more than 20"]
    },
    completed: {
        type : Boolean,
        default : false,

    }
})

module.exports = mongoose.model('Task', TaskSchema)