const connectDB = require('./db/connect')
const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/errorHandler')
require('dotenv').config()

const url = process.env.MONGO_URI

app.use(express.static('./public'))

app.use(express.json())

const port = process.env.PORT || 5000;

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)
const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, () => {
            console.log(`Listening at port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}

start()


//app.get('api/v1/tasks') -get all the tasks
//app.post('api/v1/tasks') - create a new tasks
//app.get('api/v1/tasks/:id') - get single task
//app.patch('api/v1/tasks') - update task
//app.delete('api/v1/tasks') - delete task

