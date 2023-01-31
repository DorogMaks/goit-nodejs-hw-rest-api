const { Schema } = require('mongoose');

const usersCollectionSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = usersCollectionSchema;
