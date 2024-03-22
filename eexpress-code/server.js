const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(app.get('env'));
// console.log(process.env);
const dbHost = process.env.DB_HOST;
console.log(dbHost); // 输出：localhost
const user = process.env.USERNAME;
console.log(user);
const DB_HOST = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection established');
  })
  .catch((err) => {
    console.log('chucuo;e');
  });

//schema
const tourSchema = new mongoose.Schema({
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
});

const Tour = mongoose.model('Tour', tourSchema);
const tourTest1 = new Tour({
  name: 'The summer tour',
  price: 998,
});
tourTest1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log('error: ' + err.message);
  });

//localhost

const port = process.env.PORT || 999;
app.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
