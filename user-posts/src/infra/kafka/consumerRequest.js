const kafka = require('kafka-node');

const ConsumerLib = {
  Consumer: kafka.Consumer,

  async configConsumer(kafkaTopic){
    const client = new kafka.KafkaClient('localhost:9092');
    return new Consumer(
      client,
      [{ topic: kafkaTopic, partition: 0 }],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
      }
    );
  },


  async handle(kafkaTopic){
    const consumer = this.configConsumer(kafkaTopic)
    const messageResponse = new Promise((resolve,rejected)=>{
      consumer.on('message', async function(message) {
        if(message.value){
          return resolve(message.value)
        }
        rejected(message)
      })
    })
    return messageResponse
  }
}
module.exports={ConsumerLib}