const express = require('express');
const userRouter = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
} = require('../controllers/userController.v2');
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').patch(updateUser);

module.exports = userRouter;
