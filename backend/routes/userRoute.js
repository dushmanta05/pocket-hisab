const express = require("express");
const {
  registerUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
