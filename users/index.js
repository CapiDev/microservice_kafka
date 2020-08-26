const kafkaLib = require('kafka-node');
const kafka = require('../api/kafka');
const User = require('./user/schema');

const Consumer = kafkaLib.Consumer;



function createConsumer(topic, handle){
  const client = new kafkaLib.KafkaClient('localhost:9092');
  const consumer = new Consumer(
    client,
    [{ topic: topic, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  )
  consumer.on('message',handle) 
  consumer.on("error", (err)=>{   
    console.error('error =>', err)
  })
}

createConsumer('create-user', async(message)=>{
  console.log(message);
  const data = JSON.parse(message.value)
  const user = await User.create(data.message.body);
  await kafka.send('create-user-response',user, message.key)
}) 

createConsumer('get-user', async(message)=>{
  console.log(message);
  const data = JSON.parse(message.value)
  const user = await User.findById(data.message.body.id);
  await kafka.send('get-user-response',user, message.key)
})

createConsumer('list-user', async(message)=>{
  console.log(message);
  const users = await User.find();
  await kafka.send('get-user-response',users, message.key)
})

// createConsumer(topic, async(message)=>{
//   console.log(message);
//   const data = JSON.parse(message.value)
//   const user = await User.create(data.message.body);
//   await kafka.send(`${topic}-response`,user, message.key)
// })

// createConsumer(topic, async(message)=>{
//   console.log(message);
//   const data = JSON.parse(message.value)
//   const user = await User.create(data.message.body);
//   await kafka.send(`${topic}-response`,user, message.key)
// })

