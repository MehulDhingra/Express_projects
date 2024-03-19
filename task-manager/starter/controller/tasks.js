// const { CustomAPIError } = require("../../final/errors/custom-error")
const { customError } = require("../errors/custom-errors")
const asyncWrapper = require("../middlewares/async")
const Task = require("../models/Task")

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(customError(("task with given id not found"), 404))
    }
    res.status(200).json({ task })

}
)

const deleteTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return res.status(404).json({ msg: `No task with the given id` });
    }
    res.status(200).json({ task });

})


const updateTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params;
    console.log(req.body);
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true
    })
    if (!task) {
        return res.status(404).json({ msg: `no task with given id` })
    }
    res.status(200).json({ task })
})
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask,
}
