const express = require('express');
const tourRouter = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
  getTop5CheapTours,
} = require('../controllers/tourController.v2');

tourRouter.param('id', (req, res, next, jack) => {
  console.log(req.body);
  console.log(`tour id is ${jack}`);
  next();
});
tourRouter.route('/top-5-cheap').get(getTop5CheapTours, getAllTours);
tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').patch(updateTour).delete(deleteTour).get(getTourById);

module.exports = tourRouter;
