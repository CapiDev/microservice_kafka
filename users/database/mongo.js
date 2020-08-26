const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/users?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose;
