const kafka = require('kafka-node');

const ProducerLib = {
  client: new kafka.KafkaClient('localhost:9092'),

  configProducer(){
    const Producer = kafka.Producer
    return new Producer(this.client)
  },

  async handle(kafkaTopic,messages,key){
    const payloadWithTopic = [{topic:kafkaTopic, messages:JSON.stringify(messages), key}]
    const producer = this.configProducer()

    return new Promise((resolve,reject) => {
      producer.send(payloadWithTopic, (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      }
        console.log('producer send request')
        resolve(true)
      })
    
    })
  },
}
module.exports={ProducerLib}