const express = require('express');
const tourRouter = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
} = require('../controllers/tourController.v2');

tourRouter.param('id', (req, res, next, id) => {
  console.log(`tour id is ${id}`);
  next();
});
tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').patch(updateTour).delete(deleteTour).get(getTourById);

module.exports = tourRouter;
