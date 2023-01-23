const { Schema, SchemaTypes } = require('mongoose');

const contactsCollectionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = contactsCollectionSchema;
