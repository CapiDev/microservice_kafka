const v4 = require('uuid')
const kafkaLib = require('kafka-node');

class Kafka {
  constructor(){
    const client = new kafkaLib.KafkaClient('localhost:2181');
    this.consumer = new kafkaLib.Consumer(
      client,
      [],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
      }
    );
    this.producer = new kafkaLib.Producer(client) 
  }

  async request(topic, message) {
    this.consumer.addTopics([{ topic: `${topic}-response`, partition: 0 }])
    const messageId = v4();

    this.producer.send([{
      topic,
      messages: JSON.stringify(message),
      key: messageId
    }], ()=> console.log('enviou'))

    const {data, funct} = await new Promise (async(resolve, reject) => { 
     const funct = async function(message) {
        if(messageId === message.key){
          resolve({data:JSON.parse(message.value), funct}); 
        }
      }
      this.consumer.on('message',funct);
      setTimeout(() => {
        resolve({data: {error: "timeout"}, funct})
      }, 3000);
    })
    this.consumer.removeListener('message', funct);

    return data;
  }

  async send(topic, message, key = v4()) {
    new Promise (async(resolve, reject) => {this.producer.send([{
      topic,
      messages: JSON.stringify(message),
      key: key
    }], ()=> console.log('enviou'))
  })
}

module.exports = new Kafka();