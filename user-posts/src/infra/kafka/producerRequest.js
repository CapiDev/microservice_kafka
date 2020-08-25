const kafka = require('kafka-node');

const ProducerLib = {
  Producer: kafka.Producer,

  Client: new kafka.KafkaClient('localhost:9092'),

  producer: new Producer(client),

  async handle(kafkaTopic,payload){
    const payloadWithTopic = {topic:kafkaTopic,payload}
    producer.on('ready', async function() {
      producer.send(payloadWithTopic, (err, data) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('producer send request');
      });
    });
  },
}
module.exports={ProducerLib}