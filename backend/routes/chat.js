const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Chatroom = require("../models/Chatroom");
const authenticateJWT = require("../middleware/authenticateJWT");
const upload = require("../middleware/upload");
const moment = require("moment");

// route  post "/chat/chatroom/avatar"
// create chatroom
// private

router.post(
  "/chatroom/avatar",
  authenticateJWT,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const { path: avatar } = req.file;

      const newChatroom = new Chatroom({
        name: JSON.parse(req.body.roomName),
        user: req.user.id,
        avatar: avatar.replace(/\\/g, "/"),
        participants: JSON.parse(req.body.checked),
      });

      newChatroom.participants.push(user);
      const chatroom = await newChatroom.save();
      res.json(chatroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// route  post "/chat/chatroom"
// create chatroom
// private

router.post("/chatroom", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
    let allRooms = await Chatroom.find({}).sort({ messages: -1 });
    let participateIn = [];
    allRooms.map((room) => {
      room.participants.map((participant) => {
        if (participant._id.toString() === req.user.id) {
          participateIn.push(room);
        }
      });
    });

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
    if (chatroom.messages.length === 0) {
      newMessage.messageDate = new Date().getTime().toString();
    } else if (
      new Date().toString().substring(0, 10) !==
      chatroom.messages[chatroom.messages.length - 1].date
        .toString()
        .substring(0, 10)
    ) {
      newMessage.messageDate = new Date().getTime().toString();
    }

    chatroom.messages.push(newMessage);
    chatroom.lastMessage.text = newMessage.text;
    await chatroom.save();
    res.json(chatroom);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send("Server Error");
  }
});

// //route /chat/image/:id
// // post create new image message
// //private

router.post(
  "/image/:id",
  authenticateJWT,
  upload.single("image"),
  async (req, res) => {
    try {
      //we have the user from authenticateJWT
      const user = await User.findById(req.user.id).select("-password");
      const chatroom = await Chatroom.findOne({ _id: req.params.id });

      const { path: image } = req.file;
      const newMessage = {
        image: image.replace(/\\/g, "/"),
        user: req.user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      if (chatroom.messages.length === 0) {
        newMessage.messageDate = new Date().getTime().toString();
      } else if (
        new Date().toString().substring(0, 10) !==
        chatroom.messages[chatroom.messages.length - 1].date
          .toString()
          .substring(0, 10)
      ) {
        newMessage.messageDate = new Date().getTime().toString();
      }

      chatroom.messages.push(newMessage);
      chatroom.lastMessage.text = "picture";
      await chatroom.save();
      res.json(chatroom);
    } catch (err) {
      console.error(err.msg);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
