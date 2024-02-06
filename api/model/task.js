const Mongoose = require("mongoose");
const taskSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Task = Mongoose.model("task", taskSchema);
module.exports = Task;
