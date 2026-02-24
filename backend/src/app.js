const express = require('express');
const  route  = require('./routes/AI.routes');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json())
app.use('/',route)


module.exports=app;