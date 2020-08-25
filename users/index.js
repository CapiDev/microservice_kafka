const kafkaLib = require('kafka-node');
const kafka = require('../api/kafka');

const Consumer = kafkaLib.Consumer;
const client = new kafkaLib.KafkaClient('localhost:9092');

const topic = 'user'

const consumer = new Consumer(
  client,
  [{topic:'user',partition:0}],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    fromOffset: false
  }
)

consumer.on('message',async(message)=>{
  console.log(message);
  kafka.send(`${topic}-response`,JSON.parse(message.value), message.key)
})
consumer.on("error", (err)=>{   
  console.error('error =>', err)
})