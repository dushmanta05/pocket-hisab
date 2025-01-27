const express = require('express');
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/UserController');
const router = express.Router();

router.post('/register', createUser);
router.get('/all', getAllUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
