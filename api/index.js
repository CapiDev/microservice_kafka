const express = require('express');

const kafka = require('./kafka')

const server = express();

server.use(express.json())

server.get('/', async (req, res) => {
  const data = await kafka.request('user', {message: "test"})
  res.json(data)
})

const port = 3333;
server.listen(port,()=>{
  console.log(`server running on port => ${port}`) 
})
