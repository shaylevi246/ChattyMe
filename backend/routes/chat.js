const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Chatroom = require("../models/Chatroom");
const authenticateJWT = require("../middleware/authenticateJWT");

// route  post "/chat/chatroom"
// create chatroom
// private

router.post("/chatroom", authenticateJWT, async (req, res) => {
  // const errors = validationResult(req),
  // if(!errors.isEmpty()){
  //     return res.status(400).json({errors: errors.array()})
  // };
  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log(req.body);
    const newChatroom = new Chatroom({
      name: req.body.roomName,
      user: req.user.id,
      participants: req.body.checked,
    });
    newChatroom.participants.push(user);
    const chatroom = await newChatroom.save();
    res.json(chatroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route get "/chat/chatrooms"
// get all chatrooms that user participate in
//private

router.get("/chatrooms", authenticateJWT, async (req, res) => {
  try {
    let chatrooms = await Chatroom.find({ user: req.user.id }).sort({
      messages: -1,
    });

    let allRooms = await Chatroom.find({}).sort({ messages: -1 });
    let participateIn = [];
    allRooms.map((room) => {
      room.participants.map((participant) => {
        if (participant._id.toString() === req.user.id) {
          participateIn.push(room);
        }
      });
    });

    // objs.sort((a, b) => a.last_nom.localeCompare(b.last_nom));

    res.json(participateIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route /chat/:id
// get chat by id
//Private

router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const chatroom = await Chatroom.findOne({ _id: req.params.id });
    res.json(chatroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route /chat/message/:id
// post create new message
//private

router.post("/message/:id", authenticateJWT, async (req, res) => {
  try {
    //we have the user from authenticateJWT
    const user = await User.findById(req.user.id).select("-password");
    const chatroom = await Chatroom.findOne({ _id: req.params.id });
    const newMessage = {
      text: req.body.text,
      user: req.user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    chatroom.messages.push(newMessage);
    chatroom.lastMessage.text = newMessage.text;
    await chatroom.save();
    res.json(chatroom);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
