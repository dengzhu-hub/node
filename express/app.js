const express = require('express');
const app = express();
const port = 3004;
app.get('/', (req, res) => {
  res.status(200).send('hello world!');
});
app.get('/profile', (req, res) => {
  res.status(200).send('this is your profile!');
});
app.get('/login', (req, res) => {
  res.json({
    message: 'welcome  to the naturs',
    error: 'something wrong',
    crateAt: new Date(),
  });
});
app.listen(port, () => {
  console.log(`the host are listened on https://127.0.0.1:${port}`);
});
