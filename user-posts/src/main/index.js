const {MongoLib} = require('../infra/mongo/mongoLib')
const {ConsumerLib} = require('../infra/kafka/consumerRequest')


MongoLib.connect('mongodb://root:root@localhost:27017/clean-node?authSource=admin').then(async () => {

  const consumerResponse = await ConsumerLib.handle('user-posts')
  console.log(consumerResponse)
})