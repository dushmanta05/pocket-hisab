const User = require("../model/userModel");

const registerUser = async (req, res) => {
  const { username, fullName, password, email } = req.body;
  console.log("Received Request Body:", req.body);

  try {
    if (!username || !fullName || !password || !email) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = new User({ username, fullName, password, email });
    await user.save();
    res.status(201).json({ msg: "user created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "registration failed", error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "failed to fethch user: ", error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "failes to fetch user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, fullName, password, email } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.password = password || user.password;
    user.email = email || user.email;

    const updatedUser = await user.save();
    console.log("updated user", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({ message: "user deleted successfully" });
  } else {
    res.status(400).json("user not found");
  }
};

const loginUser = () => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ msg: "missing email or password" });
  }

  const user = User.findOne(email);
};

module.exports = {
  registerUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
