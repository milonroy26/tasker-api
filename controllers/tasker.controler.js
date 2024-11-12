const { default: mongoose } = require("mongoose");
const { taskerModel } = require("../models/tasker.model");

// get all tasks controller
const getAllTasks = async (req, res) => {
    try{
        const data = await taskerModel.find();
        res.status(200).json(data);
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
}

// create a task controller
const createTask = async (req, res) => {
    const task = new taskerModel({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        isCompleted: req.body.isCompleted,
    })
    try{
        const seveTask = await task.save();
        return res.status(201).json({
            message: "Task created successfully",
            data: seveTask
        })
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
}

// update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    try{
        const data = await taskerModel.findByIdAndUpdate({_id: id}, req.body, {new: true});

        if(!data){
            return res.status(404).json({error: "Task not found"});
        }

        return res.status(200).json({
            message: "Task updated successfully",
            data: data
        });
    }    
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
}

// findone task
const findOneTask = async (req, res) => {
    // check if id is valid
    if(mongoose.Types.ObjectId.isValid(req.params.id) == false) return res.status(400).json({error: 'Invalid mongodb ID'});

    const { id } = req.params;
    try{
        const data = await taskerModel.findById({_id: id});
        if(!data){
            return res.status(404).json({
                error: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Task found successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
}

// delete a task
const deleteTask = async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id) == false) return res.status(400).json({error: 'Invalid mongodb ID'});
    try{
        const data = await taskerModel.findByIdAndDelete({_id: req.params.id});
        if(!data){
            return res.status(404).json({
                error: "Task not found"
            })
        }
        return res.status(200).json({
            message: "Task deleted successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    findOneTask
}