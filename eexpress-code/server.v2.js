require('dotenv').config({ path: './.config.env' });
const mongoose = require('mongoose');
const app = require('./app.v2');
const port = process.env.PORT || 3000;
console.log(app.get('env'));
console.log(process.env.NODE_ENV);
console.log(process.env.PASSWORD);

const password = process.env.PASSWORD;
const db = process.env.DATABASE?.replace('<PASSWORD>', process.env.PASSWORD);
console.log(db);
mongoose.connect(db, {}).then((con) => {
  // console.log(con.connections)
  console.log('Connected to MongoDB');
});
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
    },
    price: {
      type: String,
      required: [true, 'A tour must have a price'],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  { capped: 1024, autoIndex: false, bufferCommands: 1000 },
);
const tourModal = mongoose.model('tours', tourSchema);

const tourTest1 = new tourModal({
  name: 'The summer tour',
  price: 998,
});

tourTest1
  .save()
  .then((doc) => {
    console.log('Saved tour');
    console.log(doc);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
