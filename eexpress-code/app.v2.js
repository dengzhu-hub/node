const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter.v2');
const userRouter = require('./routes/userRouter.v2');

// middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log('my name is middleware');
  // console.log(process.env.NODE_ENV);

  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// console.log(tours);

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTourById);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

// app route

// const toursRoute = app.route('/api/v1/tours');
// toursRoute.get(getAllTours).post(createTour);
// const tourIdRoute = app.route('/api/v1/tours/:id');
// tourIdRoute.patch(updateTour).delete(deleteTour).get(getTourById);

// const userRoute = app.route('/api/v1/users');
// userRoute.get(getAllUsers).post(createUser);
// const userIdRoute = app.route('/api/v1/users/:id');
// userIdRoute.patch(updateUser);

module.exports = app;
