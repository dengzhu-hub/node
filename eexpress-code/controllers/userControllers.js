const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestT: req.requestTime,
    result: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const id = req.params._id;
  console.log(req.params);

  // if (id > tours.length)
  const user = users.find((el) => el._id === id);
  if (!user)
    return res
      .status(404)
      .sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
  console.dir(req.params);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  const newId = users[users.length - 1]._id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(newUser),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        addTime: new Date(),
        data: {
          newUser,
        },
      });
    },
  );
};

exports.updateUser = (req, res) => {
  if (req.params.id > users.length)
    return res.status(404).json({
      status: 'error',
      messgae: 'something went wrong',
    });
  res.status(200).json({
    status: 'success',
    data: '<updated the tour...>',
  });
};

exports.deleteUser = (req, res) => {
  if (req.params.id > users.length)
    return res.status(404).json({
      status: 'error',
      messgae: 'something went wrong',
    });
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
