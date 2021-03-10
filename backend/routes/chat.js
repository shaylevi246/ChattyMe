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
    });

    const chatroom = await newChatroom.save();
    res.json(chatroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route get "/chat/chatrooms"
// get all chatrooms
//private

router.get("/chatrooms", authenticateJWT, async (req, res) => {
  try {
    let chatrooms = await Chatroom.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(chatrooms);
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

module.exports = router;
