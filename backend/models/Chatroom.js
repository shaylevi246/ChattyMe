const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  avatar: {
    type: String,
  },
  lastMessage: {
    text: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
  ],
  messages: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chatroom = mongoose.model("chatroom", chatroomSchema);

module.exports = Chatroom;
