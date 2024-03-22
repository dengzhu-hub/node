const mongoose = require('mongoose');
const { exit } = require('node:process');
const path = require('path');
const fs = require('node:fs');
const Tour = require('../../models/tourModels');
require('dotenv').config({ path: './../../.config.env' });

console.log(__dirname);
console.log(__filename);
const db = process.env.DATABASE?.replace('<PASSWORD>', process.env.PASSWORD);
console.log(db);
mongoose.connect(db, {}).then((con) => {
  // console.log(con.connections)
  console.log('Connected to MongoDB');
});
const currentFile = 'tours-simple.json';
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, currentFile), 'utf-8'),
);

const importDataToDb = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported successfully');
  } catch (err) {
    console.log(err);
  }
  exit(1);
};
const deleteDataFromDb = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  exit(1);
};

const args = process.argv.slice(2);
if (args[0] === '--import') {
  importDataToDb();
} else if (args[0] === '--delete') {
  deleteDataFromDb();
}
console.log(process.env.NODE_ENV);
