const mongoose = require('../database/mongo');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
  virtuals: true,
});

const User = mongoose.model(
  'Users',
  UserSchema
);

module.exports = User;
