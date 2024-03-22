const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
exports.checkId = (req, res, next, val) => {
  console.log(`the id is ${val}`);

  if (val > tours.length)
    return res.status(404).json({
      status: 'error',
      messgae: 'something went wrong',
    });
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestAt: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params['id'] * 1;
  // if (id > tours.length)
  const tour = tours.find((el) => el.id === id);
  if (!tour)
    return res
      .status(404)
      .sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
  console.dir(req.params);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: '<updated the tour...>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
