const mongoose = require("mongoose");
const { Schema } = mongoose;

const programSchema = new Schema({ any: Schema.Types.Mixed });

module.exports = mongoose.model("Program", programSchema, "yledata");
