const express = require('express');
const app = express();

const fs = require('fs');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');
const toRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// MIDDLEWARE
console.log(process.env.NODE_E);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('hello form here!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/tours', toRouter);
app.use('/api/v1/users', userRouter);

// (async () => {
//     try {
//       const response = await axios.get('https://jsonplaceholder.typicode.com/todos'); // 替换为你要抓取的API的URL
//       const data = response.data; // 获取响应数据
//       // 在这里对数据进行处理或保存到变量
//       fs.writeFileSync(`${__dirname}/dev-data/data/todo.json`, JSON.stringify(data));

//      console.log('Data saved to api.json file');
//      process.exit();

//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }

//   })()

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/todo.json`)
// );

//get
// app.get('/', (req, res) => {
//   res.set({
//     'Content-Type': 'application/json',
//     ETag: '12345',
//   });
//   res.status(500).json({ error: 'message' , message: 'hello from her to world, express!'});

// //   res.status(200).send('hello world');
//   // res.status(404).sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
// });

// // post
// app.post('/', (req, res) => {
//     res.set({
//         'Content-Type': 'application/json',
//         ETag: '12345',

//     })
//     res.status(200).send({message: 'hello from her to world, express, why not from her'})
// })

//ROUTES HANDLING

// app.get('/api/v1/tours', getAllTours);
// // pass params

// app.get('/api/v1/tours/:id/', getTour);

// app.post('/api/v1/tours', createTour);

// // patch
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// route

module.exports = app;
