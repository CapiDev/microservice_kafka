const kafka = require('kafka-node');

const ConsumerLib = {


  async configConsumer(topic){
    const client = new kafka.KafkaClient('localhost:9092')

    const Consumer = kafka.Consumer

    const consumer = new Consumer(
      client,
      [],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
      }
    )
    consumer.addTopics([{ topic, partition: 0 }])
    return consumer
  },
 
}
module.exports={ConsumerLib}