const { getAllTasks, createTask, updateTask, findOneTask } = require('../controllers/tasker.controler');
const { schemas } = require('../validation/schemas');
const { runValidation } = require('../validation/validation');

const router = require('express').Router();

// get all tasks
router.get('/', getAllTasks);

// create a task
router.post('/create', runValidation(schemas.taskSchema), createTask)

// update a task
router.post('/update/:id', updateTask);

// findone task
router.get('/:id', findOneTask);


module.exports = router;