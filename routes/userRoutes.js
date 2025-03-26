const express = require("express");
const { checkLogin, isAdmin } = require("../middlewares/checkLogin");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/create-user", checkLogin, isAdmin, createUser);
router.get("/get-all-users", checkLogin, isAdmin, getAllUsers);
router.put("/update-user/:id", checkLogin, isAdmin, updateUser);
router.delete("/delete-user/:id", checkLogin, isAdmin, deleteUser);

module.exports = router;
