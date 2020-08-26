const express = require('express');

const kafka = require('./kafka')

const server = express();

server.use(express.json())

server.post('/users', async (req, res) => {
  const payload = req.body

  const data = await kafka.request('create-user', {message:{
    date:new Date(),    
    body:payload
  }})
 
  res.json({
    response: data
  })
})

server.get('/users/:id', async (req, res) => {
  const payload = req.body

  const data = await kafka.request('get-user', {message:{
    date:new Date(),    
    body:{id: req.params.id}
  }})
 
  res.json({
    response: data
  })
})

server.get('/users', async (req, res) => {
  const payload = req.body

  const data = await kafka.request('list-user', {message:{
    date:new Date()
  }})
 
  res.json({
    response: data
  })
})

server.post('/posts', async (req, res) => {
  const {...payload} = req.body

  const response = await kafka.request('user-posts', {message:{
    date:new Date(),    
    body:payload
  }})

  res.status(res.statusCode).json({
    msg: response.msg
  })
}) 

server.get('/posts', async (req, res) => {

  const response = await kafka.request('user-posts-lists',{})

  res.status(res.statusCode).json({
    msg: response.msg
  })
}) 

const port = 3333;
server.listen(port,()=>{
  console.log(`server running on port => ${port}`) 
})
