const express = require('express');
const  route  = require('./routes/AI.routes');

const app = express();
app.use(express.json())
app.use('/',route)


module.exports=app;