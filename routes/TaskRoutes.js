const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/TaskController');
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

router.post('/create-task',checkLogin,createTask);
router.get("/my-tasks",checkLogin,getTasks);
router.get("/get-task/:id",checkLogin,getTaskById);
router.put("/update-task/:id",checkLogin,updateTask);
router.delete("/delete-task/:id",checkLogin,deleteTask);

module.exports = router;