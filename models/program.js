const mongoose = require('mongoose');

const { Schema } = mongoose;

const programSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  any: Schema.Types.Mixed,
});

module.exports = mongoose.model('Program', programSchema, 'yledata');
