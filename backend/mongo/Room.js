const mongoose = require("mongoose");

const rosterSchema = require("./Roster").schema;
const reminderSchema = require("./Reminder").schema;
const expenseSchema = require("./Expense").schema;

// _id generated by mongoDB is the room code
const roomSchema = mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rosters: {
    type: [rosterSchema],
  },
  reminders: {
    type: [reminderSchema],
  },
  expenses: {
    type: [expenseSchema],
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);