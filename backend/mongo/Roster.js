const mongoose = require("mongoose");

const taskSchema = require("./Task").schema;

const rosterSchema = mongoose.Schema({
  title: {
    type: String,
  },
  tasks: {
    type: [taskSchema],
  },
  assignedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Roster", rosterSchema);
