const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have a maxGroupSize'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have a difficulty'],
    },
    price: {
      type: String,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    rating: {
      type: Number,
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
      minLength: 8,
      maxLength: 1000,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
      minLength: 8,
      maxLength: 1000,
      lowercase: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an imageCover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  { capped: 1024, autoIndex: false, bufferCommands: 1000 },
);
const tourModal = mongoose.model('tours', tourSchema);

module.exports = tourModal;
