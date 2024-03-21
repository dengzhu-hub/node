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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
