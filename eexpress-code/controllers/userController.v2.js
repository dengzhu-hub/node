const fs = require('fs');
const path = require('path');
const users = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'dev-data', 'data', 'users.json'),
    'utf-8',
  ),
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: users.length,
    createAt: req.requestTime,
    data: {
      users,
    },
  });
};
const createUser = (req, res) => {
  const newId = users[users.length - 1]?.id + 1;
  const newUser = {
    id: newId,
    ...req.body,
  };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json({
        status: 'success',
        data: {
          users,
        },
        createAt: new Date(),
      });
    },
  );
};
const updateUser = (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);

  const updateInfo = req.body;
  const userToUpdate = users.find((user) => user?._id === id);
  if (!userToUpdate)
    return res.status(404).json({
      error: 'user not found',
    });

  for (let key in userToUpdate) {
    if (key in updateInfo) {
      userToUpdate[key] = updateInfo[key];
    }
  }
  return res.status(200).json({
    message: 'User updated successfully',
    user: userToUpdate,
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
};
