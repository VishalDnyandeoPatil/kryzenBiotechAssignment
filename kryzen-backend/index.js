const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port;
const {connection}= require('./config/db')

app.get('/', (req, res) => {
  res.send('Hello from Kryzen Backend!');
});

app.listen(port, async() => {
  try {
    await connection
    console.log("Kryzen App connected to DB") 
  } 
  catch (error) {
    console.log(error.message);
  }
});
