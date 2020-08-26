const {MongoLib} = require('../infra/mongo/mongoLib')
const {ConsumerLib} = require('../infra/kafka/consumerRequest')
const {ProducerLib} = require('../infra/kafka/producerRequest')


MongoLib.connect('mongodb://root:root@localhost:27017/clean-node?authSource=admin').then(async () => {

  const create = await ConsumerLib.configConsumer('user-posts')

  create.on('message', async function(message) {
    if(message.value){
      
      const accountCollection = MongoLib.getCollection('user-posts')
      const newPost = await accountCollection.insertOne(JSON.parse(message.value))
      const response = MongoLib.map(newPost)

        ProducerLib.handle('user-posts-response',{
          msg: response,
          statusCode:200        
        },
        message.key
      )
    }
  })

  const list = await ConsumerLib.configConsumer('user-posts-lists')
  list.on('message', async function(message) {
    if(message.value){
      
      const accountCollection = MongoLib.getCollection('user-posts')
      const allPosts = await accountCollection.find({}).toArray()
        ProducerLib.handle('user-posts-lists-response',{
          msg: allPosts,
          statusCode:200        
        },
        message.key
      )
    }
  })

})