const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  updateProfile,
} = require("../../controller/index.controller").user;
// user routes
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-user", getUsers);
router.put("/update-user/:id", updateUser);
router.put("/update-profile/:id", updateProfile);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
