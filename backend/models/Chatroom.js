const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Chatroom = mongoose.model("chatroom", chatroomSchema);

module.exports = Chatroom;
