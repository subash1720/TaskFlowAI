const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
    deleteTask
} = require("../controllers/taskController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
module.exports = router;